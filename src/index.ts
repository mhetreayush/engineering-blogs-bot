import { ENV } from '@constants/env';
import express from 'express';
const app = express();
const { PORT } = ENV;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
