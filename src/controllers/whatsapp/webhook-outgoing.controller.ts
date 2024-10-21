import { isValidHyperlink } from '@src/helpers/is-valid-hyperlink';
import LinkModel from '@src/models/Link.model';
import UserModel, { UserStatusEnum } from '@src/models/User.model';
import { sendWhatsAppMessage } from '@src/utils/send-whatsapp-message';
import { Request, Response } from 'express';
import { inspect } from 'util';

const createUserAndSendMessage = async ({ phoneNumber, wa_id, name }) => {
  try {
    const user = await UserModel.create({
      phone_number: phoneNumber,
      wa_id,
      name,
      status: UserStatusEnum.ONBOARDING_INCOMPLETE,
    });

    await sendWhatsAppMessage({
      recipient_number: phoneNumber,
      message: `Hello ${user.name}!👋 Welcome to Revisit!\nYou'r account has been created successfully.\nLet us start by adding a link!\n\nTo add a link, just send the bot a message in the format:\n{Link name (optional)}\n{Link}\n\nFor example,\nMy favourite link\nhttps://my-fav-link.com`,
    });

    return {
      success: true,
      message: 'User created successfully and message sent',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error,
    };
  }
};

export const whatsappWebhookOutgoingController = async (req: Request, res: Response) => {
  console.log(inspect(req.body, false, null, true));
  try {
    const changes = req.body.entry[0].changes[0];

    const messages = changes.value.messages;
    if (!messages) {
      res.sendStatus(200);
      return;
    }

    const phoneNumber = changes.value.messages[0].from;
    const { profile, wa_id } = changes.value.contacts[0];
    const { name } = profile;

    const user = await UserModel.findOne({
      wa_id,
    });

    if (!user) {
      const result = await createUserAndSendMessage({
        phoneNumber,
        wa_id,
        name,
      });

      if (!result.success) {
        console.error(inspect(result.error, false, null, true));
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
      return;
    }

    const message = messages[0];
    const messageText = message.text.body;

    const messageBody = messageText.split('\n');

    let linkName = '';
    let link = '';

    if (messageBody.length === 1) {
      link = messageBody[0];
    } else if (messageBody.length === 2) {
      linkName = messageBody[0];
      link = messageBody[1];
    } else if (messageBody.length > 2) {
      await sendWhatsAppMessage({
        recipient_number: phoneNumber,
        message: `Invalid message format. Please send the link in the format:\n{Link name (optional)}\n{Link}`,
      });
      res.sendStatus(200);
      return;
    }
    console.log({ link });
    if (!isValidHyperlink(link)) {
      await sendWhatsAppMessage({
        recipient_number: phoneNumber,
        message: `Invalid link. Please send a valid link.`,
      });
      res.sendStatus(200);
      return;
    }

    await LinkModel.create({
      user_id: user._id,
      link_name: linkName.trim().length > 0 ? linkName.trim() : 'Untitled Link',
      link_url: link,
      user_phone: phoneNumber,
    });

    if (user.status !== UserStatusEnum.LINKS_ADDED) {
      await UserModel.updateOne(
        {
          _id: user._id,
        },
        {
          status: UserStatusEnum.LINKS_ADDED,
        },
      );
    }

    await sendWhatsAppMessage({
      recipient_number: phoneNumber,
      message: `Link added successfully!🎉`,
    });

    res.sendStatus(200);
    return;
  } catch (e) {
    console.error(e);
    res.sendStatus(200);
    return;
  }
};
