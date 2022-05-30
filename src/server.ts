import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', async (request: Request, response: Response) => {
  response.json({ message: 'Cubos challenge!' });
});

app.listen(3333, async () => console.log('Started...'));
