import { Router } from 'express';
import schedulingRoutes from './scheduling.routes';

const routes: Router = Router();

routes.use('/scheduling', schedulingRoutes);

export default routes;
