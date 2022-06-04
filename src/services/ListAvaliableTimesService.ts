import moment, { Moment } from 'moment';
import { CONFLICT } from '../constants/HttpStatus';
import Day from '../enums/Day';
import Frequency from '../enums/Frequency';
import AppError from '../errors/AppError';
import Interval from '../models/Interval';
import Scheduling from '../models/Scheduling';
import SchedulingRepository from '../repositorys/SchedulingRepository';

interface ListAvaliableTimesDTO {
  start: string;
  end: string;
}

interface ListAvaliableTimesResponseDTO {
  day: string;
  intervals: Array<Interval>;
}

class ListAvaliableTimesService {
  private schedulingRepository: SchedulingRepository;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute({
    start,
    end,
  }: ListAvaliableTimesDTO): Promise<Array<ListAvaliableTimesResponseDTO>> {
    const startDate: Moment = moment(this.spliter(start));
    const endDate: Moment = moment(this.spliter(end));
    const dates: Array<string> = [];

    if (startDate.isAfter(endDate)) {
      throw new AppError(
        'The start date cannot be later than the end date',
        CONFLICT,
        409,
      );
    }

    const endDateInterval: Moment = endDate.add(1, 'days');

    for (
      let date = moment(startDate);
      date.isBefore(endDateInterval);
      date.add(1, 'days')
    ) {
      dates.push(date.format('DD-MM-YYYY'));
    }

    const schedulings: Array<Scheduling> =
      await this.schedulingRepository.find();

    const avaliableTimes: Array<ListAvaliableTimesResponseDTO> = [];

    dates.forEach((date: string) => {
      const intervalsAvaliable: Array<Interval> = [];

      schedulings.forEach(async (scheduling: Scheduling) => {
        if (scheduling.type === Frequency.DAY) {
          if (scheduling.day?.toString() === date) {
            scheduling.intervals.forEach((interval: Interval) => {
              intervalsAvaliable.push(interval);
            });
          }
        } else if (scheduling.type === Frequency.DAILY) {
          scheduling.intervals.forEach((interval: Interval) => {
            intervalsAvaliable.push(interval);
          });
        } else if (scheduling.type === Frequency.WEEKLY) {
          const day: Day = await this.relationDayOnWeek(
            moment(this.spliter(date))
              .format('LLLL')
              .split(',')[0]
              .toUpperCase(),
          );

          scheduling.daysOnWeek?.forEach((days: Day) => {
            if (days === day) {
              scheduling.intervals.forEach((interval: Interval) => {
                intervalsAvaliable.push(interval);
              });
            }
          });
        }
      });

      avaliableTimes.push({ day: date, intervals: intervalsAvaliable });
    });

    return avaliableTimes;
  }

  private async relationDayOnWeek(day: string): Promise<Day> {
    let dayRelation: Day = Day.SUNDAY;

    switch (day) {
      case 'SUNDAY':
        dayRelation = Day.SUNDAY;
        break;
      case 'MONDAY':
        dayRelation = Day.MONDAY;
        break;
      case 'TUESDAY':
        dayRelation = Day.TUESDAY;
        break;
      case 'WEDNESDAY':
        dayRelation = Day.WEDNESDAY;
        break;
      case 'THURSDAY':
        dayRelation = Day.THURSDAY;
        break;
      case 'FRIDAY':
        dayRelation = Day.FRIDAY;
        break;
      case 'SATURDAY':
        dayRelation = Day.SATURDAY;
        break;
    }

    return dayRelation;
  }

  private spliter(date: string): string {
    const parts: Array<string> = date.split('-');

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}

export default ListAvaliableTimesService;
