import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const UserStatusEnum = {
  ONBOARDING_INCOMPLETE: 'ONBOARDING_INCOMPLETE',
  ONBOARDING_COMPLETE: 'ONBOARDING_COMPLETE',
  SCHEDULES_NOT_SET: 'SCHEDULES_NOT_SET',
  SCHEDULES_SET: 'SCHEDULES_SET',
  LINKS_ADDED: 'LINKS_ADDED',
};

const userSchema = new Schema({
  phone_number: { type: String, required: true },
  wa_id: { type: String, required: true },
  name: { type: String, required: false, default: '' },
  schedules_set: { type: Boolean, required: false, default: false },
  schedules: { type: Array, required: false, default: [] },
  timezone: { type: String, required: false, default: 'Asia/Kolkata' },
  status: { type: String, required: false, default: UserStatusEnum.SCHEDULES_NOT_SET },
});

const UserModel = model('User', userSchema);
export default UserModel;
