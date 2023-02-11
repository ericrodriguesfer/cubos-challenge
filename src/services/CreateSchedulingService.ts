import moment from 'moment';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { Frequency } from '../models/enums/Frequency';
import { AppError } from '../errors/AppError';
import { Interval } from '../models/Interval';
import { Scheduling } from '../models/Scheduling';
import { SchedulingRepository } from '../repositorys/SchedulingRepository';

class CreateSchedulingService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
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
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
      );
    } else if (type === Frequency.WEEKLY && !daysOnWeek) {
      throw new AppError(
        'A weekly scheduling needs to have a date associated',
        ReasonPhrases.BAD_REQUEST,
        StatusCodes.BAD_REQUEST,
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
          ReasonPhrases.CONFLICT,
          StatusCodes.CONFLICT,
        );
      }
    });

    const existsIntersection: boolean = await this.intersectionHours(
      intervalsMounted,
    );

    if (existsIntersection) {
      throw new AppError(
        'Ranges cannot intersect each other',
        ReasonPhrases.CONFLICT,
        StatusCodes.CONFLICT,
      );
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

  private async intersectionHours(intervals: Interval[]): Promise<boolean> {
    let intersaction: boolean = false;

    if (intervals.length > 1) {
      intervals.forEach((firstInterval: Interval, firstIndex: number) => {
        intervals.forEach((secondInterval: Interval, secondIndex: number) => {
          if (firstIndex !== secondIndex) {
            const firstStartHours = moment(firstInterval.start, 'HH:mm');
            const firstEndHours = moment(firstInterval.end, 'HH:mm');
            const secondStartHours = moment(secondInterval.start, 'HH:mm');
            const secondEndHours = moment(secondInterval.end, 'HH:mm');

            if (
              (firstStartHours.isSame(secondStartHours) &&
                firstEndHours.isSame(secondEndHours)) ||
              (firstStartHours.isBetween(secondStartHours, secondEndHours) &&
                !firstStartHours.isSame(secondEndHours)) ||
              secondStartHours.isBetween(firstStartHours, firstEndHours) ||
              firstEndHours.isBetween(secondStartHours, secondEndHours) ||
              secondEndHours.isBetween(firstStartHours, firstEndHours)
            ) {
              intersaction = true;
            }
          }
        });
      });
    }

    return intersaction;
  }
}

export { CreateSchedulingService };
