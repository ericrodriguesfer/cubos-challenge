import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { SchedulingController } from '../controllers/SchedulingController';
import {
  createSchedulingSchema,
  deleteSchedulingSchema,
  getSchedulingAvaliable,
} from '../validations/SchedulingValidations';

const schedulingRoutes: Router = Router();
const schedulingController: SchedulingController = new SchedulingController();

schedulingRoutes.get('/', schedulingController.list);
schedulingRoutes.get(
  '/:start/:end',
  celebrate({ [Segments.PARAMS]: getSchedulingAvaliable }),
  schedulingController.listAvailable,
);
schedulingRoutes.post(
  '/',
  celebrate({ [Segments.BODY]: createSchedulingSchema }),
  schedulingController.create,
);
schedulingRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: deleteSchedulingSchema }),
  schedulingController.delete,
);

export { schedulingRoutes };
