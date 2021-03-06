import Scheduling from '../models/Scheduling';
import ILoadJson from '../providers/json/load/contract/LoadJsonContract';
import LoadJsonImplementations from '../providers/json/load/implementations/LoadJsonImplementations';
import ISaveJson from '../providers/json/save/contract/SaveJsonContract';
import SaveJsonImplementations from '../providers/json/save/implementations/SaveJsonImplementations';

class SchedulingRepository {
  private schedulings: Array<Scheduling>;
  private load: ILoadJson;
  private save: ISaveJson;

  constructor() {
    this.schedulings = [];
    this.load = new LoadJsonImplementations();
    this.save = new SaveJsonImplementations();
  }

  public async find(): Promise<Array<Scheduling>> {
    await this.sync();
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

    await this.save.saveJson(this.schedulings);
    await this.sync();

    return scheduling;
  }

  public async delete({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    const index: number = this.schedulings.findIndex(
      (scheduling: Scheduling) => scheduling.id === id,
    );

    const scheduling: Scheduling = this.schedulings[index];

    this.schedulings.splice(index, 1);

    await this.save.saveJson(this.schedulings);
    await this.sync();

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

  private async sync(): Promise<void> {
    const schedulingsSaved: Array<Scheduling> = await this.load.loadJson();
    this.schedulings = schedulingsSaved;
  }
}

export default SchedulingRepository;
