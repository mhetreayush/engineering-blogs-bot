import { addBlogController } from '@src/controllers/add-blog';
import { getDailyBlogController } from '@src/controllers/get-daily-blog-controller';
import { getRandomBlogController } from '@src/controllers/get-random-blog';
import { Router } from 'express';

const router = Router();

router.get('/random-blog', getRandomBlogController);
router.post('/add-blog', addBlogController);
router.get('/get-daily-blog', getDailyBlogController);

export { router as blogRouter };
