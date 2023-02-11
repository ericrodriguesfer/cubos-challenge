import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { AppError } from '../errors/AppError';
import { Scheduling } from '../models/Scheduling';
import { SchedulingRepository } from '../repositorys/SchedulingRepository';

class DeleteSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    const scheduling: Scheduling | undefined =
      await this.schedulingRepository.findById({ id });

    if (!scheduling) {
      throw new AppError(
        'This scheduling not found in our database',
        ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND,
      );
    }

    const deletedScheduling: Scheduling =
      await this.schedulingRepository.delete({
        id: scheduling.id,
      });

    return deletedScheduling;
  }
}

export { DeleteSchedulingService };
