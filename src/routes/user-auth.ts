import { generateOTPController, verifyOTPController } from '@src/controllers/user-auth/user-auth.controller';
import { Router } from 'express';

const router = Router();

router.get('/generateOTP', generateOTPController);

router.post('/verifyOTP', verifyOTPController);

export { router as userAuthRouter };
