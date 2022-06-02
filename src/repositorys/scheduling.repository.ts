import Scheduling from '../models/scheduling';
import ILoadJson from '../providers/json/load/contract/loadJson.interface';
import LoadJsonImplementations from '../providers/json/load/implementations/loadJson.implementations';

class SchedulingRepository {
  private schedulings: Array<Scheduling>;
  private load: ILoadJson;

  constructor() {
    this.schedulings = [];
    this.load = new LoadJsonImplementations();
  }

  public async sync(): Promise<void> {
    const schedulingsSaved: Array<Scheduling> = await this.load.loadJson();
    this.schedulings = schedulingsSaved;
  }

  public async listAll(): Promise<Array<Scheduling>> {
    return this.schedulings;
  }

  public async create({
    type,
    day,
    daysOnWeek,
    intervals,
  }: Omit<Scheduling, 'id'>): Promise<Scheduling> {
    const scheduling: Scheduling = new Scheduling({
      type,
      day,
      daysOnWeek,
      intervals,
    });

    this.schedulings.push(scheduling);

    return scheduling;
  }

  public async delete({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    const index: number = this.schedulings.findIndex(
      (scheduling: Scheduling) => scheduling.id === id,
    );

    const scheduling: Scheduling = this.schedulings[index];

    this.schedulings.splice(index, 1);

    return scheduling;
  }

  public async findById({
    id,
  }: Pick<Scheduling, 'id'>): Promise<Scheduling | undefined> {
    const scheduling: Scheduling | undefined = this.schedulings.find(
      (scheduling: Scheduling) => scheduling.id === id,
    );

    return scheduling;
  }
}

export default SchedulingRepository;
