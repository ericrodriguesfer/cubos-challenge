import moment from 'moment';
import { BAD_REQUEST, CONFLICT } from '../constants/HttpStatus';
import Frequency from '../enums/Frequency';
import AppError from '../errors/AppError';
import Interval from '../models/Interval';
import Scheduling from '../models/Scheduling';
import IIntersectionHours from '../providers/hours/intersection/contract/IntersectionHoursContract';
import IntersectionHoursImplementations from '../providers/hours/intersection/implementations/IntersectionHoursImplementations';
import SchedulingRepository from '../repositorys/SchedulingRepository';

class CreateSchedulingService {
  private schedulingRepository: SchedulingRepository;
  private intersectionHours: IIntersectionHours;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
    this.intersectionHours = new IntersectionHoursImplementations();
  }

  async execute({
    type,
    day,
    daysOnWeek,
    intervals,
  }: Omit<Scheduling, 'id'>): Promise<Scheduling> {
    if (type === Frequency.DAY && !day) {
      throw new AppError(
        'A day scheduling needs to have a date associated',
        BAD_REQUEST,
      );
    } else if (type === Frequency.WEEKLY && !daysOnWeek) {
      throw new AppError(
        'A weekly scheduling needs to have a date associated',
        BAD_REQUEST,
      );
    }

    const intervalsMounted: Array<Interval> = intervals.map(
      (interval: Interval) => interval,
    );

    intervalsMounted.forEach((interval: Interval) => {
      if (
        !moment(interval.start, 'HH:mm').isBefore(moment(interval.end, 'HH:mm'))
      ) {
        throw new AppError(
          'An interval cannot have the beginning after the end',
          CONFLICT,
          409,
        );
      }
    });

    const existsIntersection: boolean = await this.intersectionHours.exists(
      intervalsMounted,
    );

    if (existsIntersection) {
      throw new AppError('Ranges cannot intersect each other', CONFLICT, 409);
    }

    const schedulingCreated: Scheduling =
      await this.schedulingRepository.create({
        type,
        day,
        daysOnWeek,
        intervals: intervalsMounted,
      });

    return schedulingCreated;
  }
}

export default CreateSchedulingService;
