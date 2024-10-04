import { ENV } from '@src/constants/env';
import { keepAliveMiddleware } from '@src/middlewares/keep-alive-middleware';
import { blogRouter } from '@src/routes/blog-router';
import bodyParser from 'body-parser';
import express from 'express';
import { Express } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(keepAliveMiddleware());

const { PORT, BASE_URL } = ENV;

app.use(blogRouter);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${BASE_URL}:${PORT}`);
});
