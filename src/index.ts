import { ENV } from '@constants/env';
import bodyParser from 'body-parser';
import express from 'express';
import { Express, Request, Response } from 'express';
import { kvClient } from '@lib/vercel-kv';
import { keepAliveMiddleware } from '@middlewares/keep-alive-middleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(keepAliveMiddleware());

const { PORT, BASE_URL } = ENV;

app.post('/kv', async (req: Request, res: Response) => {
  try {
    const { key, value, options = {} } = req.body;
    console.log(`Setting key: ${key}, value: ${value}, options: ${JSON.stringify(options)}`);
    await kvClient.set(key, value, options);
    res.status(200).send('OK');
  } catch (e) {
    console.error('Error setting KV:', e); // Log the error
    res.status(500).json({ error: 'Internal Server Error', details: e });
  }
});

app.get('/kv', async (req: Request, res: Response) => {
  try {
    const user = await kvClient.get('user:me');
    console.log('Fetched user:', user); // Log the fetched data
    res.status(200).json(user);
  } catch (e) {
    console.error('Error fetching KV:', e); // Log the error
    res.status(500).json({ error: 'Internal Server Error', details: e });
  }
});

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send("I'm up");
  } catch (e) {
    res.status(500).json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});
