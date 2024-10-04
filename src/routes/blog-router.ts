import { addBlogController } from '@src/controllers/add-blog';
import { getRandomBlogController } from '@src/controllers/get-random-blog';
import { Router } from 'express';

const router = Router();

router.get('/random-blog', getRandomBlogController);
router.post('/add-blog', addBlogController);

export { router as blogRouter };
