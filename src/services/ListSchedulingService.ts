import Scheduling from '../models/Scheduling';
import SchedulingRepository from '../repositorys/SchedulingRepository';

class ListSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute(): Promise<Array<Scheduling>> {
    return this.schedulingRepository.find();
  }
}

export default ListSchedulingService;
