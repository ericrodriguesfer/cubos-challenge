import moment from 'moment';
import Interval from '../../../../models/interval';
import IIntersectionHours from '../contract/intersectionHours.interface';

class IntersectionHoursImplementations implements IIntersectionHours {
  public async exists(intervals: Interval[]): Promise<boolean> {
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

export default IntersectionHoursImplementations;
