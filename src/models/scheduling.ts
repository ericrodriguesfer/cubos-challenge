import { v4 } from 'uuid';
import Day from '../enums/day';
import Frequency from '../enums/frequency';
import Interval from './interval';

class Scheduling {
  id: string;
  type: Frequency;
  day?: Date;
  daysOnWeek?: Array<Day>;
  intervals: Array<Interval>;

  constructor({ type, day, daysOnWeek, intervals }: Omit<Scheduling, 'id'>) {
    this.id = v4();
    this.type = type;
    this.day = day;
    this.daysOnWeek = daysOnWeek;
    this.intervals = intervals;
  }
}

export default Scheduling;
