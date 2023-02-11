import path from 'path';
import files from 'fs';

import { Scheduling } from '../models/Scheduling';

const PATH_JSON = path.resolve(__dirname, '..', 'database', 'data.json');

class SchedulingRepository {
  private schedulings: Array<Scheduling>;

  constructor() {
    this.schedulings = [];
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

    await this.save(this.schedulings);
    await this.sync();

    return scheduling;
  }

  public async delete({ id }: Pick<Scheduling, 'id'>): Promise<Scheduling> {
    const index: number = this.schedulings.findIndex(
      (scheduling: Scheduling) => scheduling.id === id,
    );

    const scheduling: Scheduling = this.schedulings[index];

    this.schedulings.splice(index, 1);

    await this.save(this.schedulings);
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

  private async save(schedulings: Array<Scheduling>): Promise<void> {
    files.writeFileSync(
      PATH_JSON,
      JSON.stringify(schedulings, null, 2),
      'utf-8',
    );
  }

  private async sync(): Promise<void> {
    const schedulingsSaved: Array<Scheduling> = JSON.parse(
      files.existsSync(PATH_JSON)
        ? files.readFileSync(PATH_JSON, 'utf-8').toString()
        : '""',
    );
    this.schedulings = schedulingsSaved;
  }
}

export { SchedulingRepository };
