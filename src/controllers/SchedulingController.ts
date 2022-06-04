import { Request, Response } from 'express';
import Scheduling from '../models/Scheduling';
import SchedulingRepository from '../repositorys/SchedulingRepository';
import CreateSchedulingService from '../services/CreateSchedulingService';
import DeleteSchedulingService from '../services/DeleteSchedulingService';
import ListAvaliableTimesService from '../services/ListAvaliableTimesService';
import ListSchedulingService from '../services/ListSchedulingService';

const schedulingRepository: SchedulingRepository = new SchedulingRepository();

class SchedulingController {
  async list(request: Request, response: Response): Promise<Response> {
    const listSchedulingService: ListSchedulingService =
      new ListSchedulingService(schedulingRepository);

    const schedulings: Array<Scheduling> =
      await listSchedulingService.execute();

    return response.json({ schedulings });
  }

  async listAvailable(request: Request, response: Response): Promise<Response> {
    const { start, end } = request.params;

    const listAvaliableTimesService: ListAvaliableTimesService =
      new ListAvaliableTimesService(schedulingRepository);

    const avaliables = await listAvaliableTimesService.execute({
      start,
      end,
    });

    return response.json(avaliables);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { type, day, daysOnWeek, intervals } = request.body;

    const createSchedulingService: CreateSchedulingService =
      new CreateSchedulingService(schedulingRepository);

    const createScheduling: Scheduling = await createSchedulingService.execute({
      type,
      day,
      daysOnWeek,
      intervals,
    });

    return response.json({
      message: 'Scheduling create with success!',
      scheduling: createScheduling,
    });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSchedulingService: DeleteSchedulingService =
      new DeleteSchedulingService(schedulingRepository);

    const deletedScheduling: Scheduling = await deleteSchedulingService.execute(
      { id },
    );

    return response.json({
      message: 'Scheduling deleted with success!',
      scheduling: deletedScheduling,
    });
  }
}

export default SchedulingController;
