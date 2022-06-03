import { Request, Response } from 'express';
import Scheduling from '../models/scheduling';
import SchedulingRepository from '../repositorys/scheduling.repository';
import CreateSchedulingService from '../services/createScheduling.service';
import DeleteSchedulingService from '../services/deleteScheduling.service';
import ListAvaliableTimesService from '../services/listAvaliableTimes.service';
import ListSchedulingService from '../services/listScheduling.service';

const schedulingRepository: SchedulingRepository = new SchedulingRepository();

class SchedulingController {
  async list(request: Request, response: Response): Promise<Response> {
    try {
      const listSchedulingService: ListSchedulingService =
        new ListSchedulingService(schedulingRepository);

      const schedulings: Array<Scheduling> =
        await listSchedulingService.execute();

      return response.json({ schedulings });
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async listAvailable(request: Request, response: Response): Promise<Response> {
    try {
      const { start, end } = request.params;

      const listAvaliableTimesService: ListAvaliableTimesService =
        new ListAvaliableTimesService(schedulingRepository);

      const avaliables = await listAvaliableTimesService.execute({
        start,
        end,
      });

      return response.json(avaliables);
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { type, day, daysOnWeek, intervals } = request.body;

      const createSchedulingService: CreateSchedulingService =
        new CreateSchedulingService(schedulingRepository);

      const createScheduling: Scheduling =
        await createSchedulingService.execute({
          type,
          day,
          daysOnWeek,
          intervals,
        });

      return response.json({
        message: 'Scheduling create with success!',
        scheduling: createScheduling,
      });
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteSchedulingService: DeleteSchedulingService =
        new DeleteSchedulingService(schedulingRepository);

      const deletedScheduling: Scheduling =
        await deleteSchedulingService.execute({ id });

      return response.json({
        message: 'Scheduling deleted with success!',
        scheduling: deletedScheduling,
      });
    } catch (error) {
      return response.status(400).json({ error: (error as Error).message });
    }
  }
}

export default SchedulingController;
