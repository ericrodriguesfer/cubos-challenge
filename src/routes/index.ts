import { Request, Response, Router } from 'express';

const routes: Router = Router();

routes.get('/', async (request: Request, response: Response) => {
  response.json({ message: 'Cubos challenge!' });
});

export default routes;
