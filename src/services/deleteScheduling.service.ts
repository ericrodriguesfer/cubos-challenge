import Scheduling from '../models/scheduling';
import SchedulingRepository from '../repositorys/scheduling.repository';

class DeleteSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    const scheduling: Scheduling | undefined =
      await this.schedulingRepository.findById({ id });

    if (!scheduling) {
      throw new Error('This scheduling not found in our database.');
    }

    const deletedScheduling: Scheduling =
      await this.schedulingRepository.delete({
        id: scheduling.id,
      });

    return deletedScheduling;
  }
}

export default DeleteSchedulingService;
