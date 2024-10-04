import { addBlogController } from '@src/controllers/add-blog.controller';
import { getDailyBlogController } from '@src/controllers/get-daily-blog.controller';
import { getRandomBlogController } from '@src/controllers/get-random-blog.controller';
import { resetBlogsController } from '@src/controllers/reset-blogs.controller';
import { Router } from 'express';

const router = Router();

router.get('/random-blog', getRandomBlogController);
router.get('/get-daily-blog', getDailyBlogController);

router.post('/add-blog', addBlogController);
router.post('/reset-blogs', resetBlogsController);

export { router as blogRouter };
