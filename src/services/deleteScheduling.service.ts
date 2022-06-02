import Scheduling from '../models/scheduling';
import ISaveJson from '../providers/json/save/contract/saveJson.interface';
import SaveJsonImplementations from '../providers/json/save/implementations/saveJson.implementations';
import SchedulingRepository from '../repositorys/scheduling.repository';

class DeleteSchedulingService {
  private schedulingRepository: SchedulingRepository;
  private save: ISaveJson;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
    this.save = new SaveJsonImplementations();
  }

  async execute({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    await this.schedulingRepository.sync();

    const scheduling: Scheduling | undefined =
      await this.schedulingRepository.findById({ id });

    if (!scheduling) {
      throw new Error('This scheduling not found in our database.');
    }

    const deletedScheduling: Scheduling =
      await this.schedulingRepository.delete({
        id: scheduling.id,
      });

    const schedulings: Array<Scheduling> =
      await this.schedulingRepository.listAll();
    await this.save.saveJson(schedulings);
    this.schedulingRepository.sync();

    return deletedScheduling;
  }
}

export default DeleteSchedulingService;
