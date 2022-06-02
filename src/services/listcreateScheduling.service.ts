import Scheduling from '../models/scheduling';
import SchedulingRepository from '../repositorys/scheduling.repository';

class ListSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute(): Promise<Array<Scheduling>> {
    await this.schedulingRepository.sync();
    return this.schedulingRepository.listAll();
  }
}

export default ListSchedulingService;
