import moment, { Moment } from 'moment';
import Day from '../enums/day';
import Frequency from '../enums/frequency';
import Interval from '../models/interval';
import Scheduling from '../models/scheduling';
import IIntersectionHours from '../providers/hours/intersection/contract/intersectionHours.interface';
import IntersectionHoursImplementations from '../providers/hours/intersection/implementations/intersectionHours.implementations';
import SchedulingRepository from '../repositorys/scheduling.repository';

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
  private intersectionHours: IIntersectionHours;

  constructor(schedulingRepository: SchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
    this.intersectionHours = new IntersectionHoursImplementations();
  }

  async execute({
    start,
    end,
  }: ListAvaliableTimesDTO): Promise<Array<ListAvaliableTimesResponseDTO>> {
    const startDate: Moment = moment(this.spliter(start));
    const endDate: Moment = moment(this.spliter(end));
    const dates: Array<string> = [];

    if (startDate.isAfter(endDate)) {
      throw new Error('The start date cannot be later than the end date.');
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
      await this.schedulingRepository.listAll();

    const avaliableTimes: Array<ListAvaliableTimesResponseDTO> = [];

    dates.forEach((date: string) => {
      const intervalsAvaliable: Array<Interval> = [];

      schedulings.forEach(async (scheduling: Scheduling) => {
        if (scheduling.type === Frequency.DAY) {
          if (String(scheduling.day) === date) {
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
