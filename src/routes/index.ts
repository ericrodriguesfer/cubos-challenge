import { Router } from 'express';
import { schedulingRoutes } from './SchedulingRoutes';

const routes: Router = Router();

routes.use('/scheduling', schedulingRoutes);

export { routes };
