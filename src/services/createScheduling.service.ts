import moment from 'moment';
import Frequency from '../enums/frequency';
import Interval from '../models/interval';
import Scheduling from '../models/scheduling';
import IIntersectionHours from '../providers/hours/intersection/contract/intersectionHours.interface';
import IntersectionHoursImplementations from '../providers/hours/intersection/implementations/intersectionHours.implementations';
import ISaveJson from '../providers/json/save/contract/saveJson.interface';
import SaveJsonImplementations from '../providers/json/save/implementations/savejson.implementations';
import SchedulingRepository from '../repositorys/scheduling.repository';

class CreateSchedulingService {
  private schedulingRepository: SchedulingRepository;
  private intersectionHours: IIntersectionHours;
  private save: ISaveJson;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
    this.intersectionHours = new IntersectionHoursImplementations();
    this.save = new SaveJsonImplementations();
  }

  async execute({
    type,
    day,
    daysOnWeek,
    intervals,
  }: Omit<Scheduling, 'id'>): Promise<Scheduling> {
    if (type === Frequency.DAY && !day) {
      throw new Error('A day scheduling needs to have a date associated.');
    } else if (type === Frequency.WEEKLY && !daysOnWeek) {
      throw new Error('A weekly scheduling needs to have a date associated.');
    }

    const intervalsMounted: Array<Interval> = intervals.map(
      (interval: Interval) => interval,
    );

    intervalsMounted.forEach((interval: Interval) => {
      if (
        !moment(interval.start, 'HH:mm').isBefore(moment(interval.end, 'HH:mm'))
      ) {
        throw new Error('An interval cannot have the beginning after the end.');
      }
    });

    const existsIntersection: boolean = await this.intersectionHours.exists(
      intervalsMounted,
    );

    if (existsIntersection) {
      throw new Error('Ranges cannot intersect each other.');
    }

    const schedulingCreated: Scheduling =
      await this.schedulingRepository.create({
        type,
        day,
        daysOnWeek,
        intervals: intervalsMounted,
      });

    const schedulings: Array<Scheduling> =
      await this.schedulingRepository.listAll();

    await this.save.saveJson(schedulings);

    return schedulingCreated;
  }
}

export default CreateSchedulingService;
