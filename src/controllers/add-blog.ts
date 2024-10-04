import { UNREAD_KEY } from '@src/constants/qv-keys';
import { kvClient } from '@src/lib/vercel-kv';
import type { Blog } from '@src/types/blog';
import { Request, Response } from 'express';

export const addBlogController = async (req: Request, res: Response) => {
  const { blogUrl, blogName } = req.body;

  if (!blogUrl || !blogName) {
    res.status(400).send('Blog URL and Name are required.');
    return;
  }

  // Get existing unread blogs
  const existingUnreadBlogs = ((await kvClient.get(UNREAD_KEY)) ?? []) as Blog[];
  const unreadBlogsArray = existingUnreadBlogs;

  // Add new blog to the unread list
  unreadBlogsArray.push({ blogUrl, blogName });
  await kvClient.set(UNREAD_KEY, unreadBlogsArray);

  res.status(201).json({ message: 'Blog added to unread list.', blog: { blogUrl, blogName } });
};
