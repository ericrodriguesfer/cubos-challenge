import Interval from '../../../../models/Interval';

interface IIntersectionHours {
  exists(intervals: Array<Interval>): Promise<boolean>;
}

export default IIntersectionHours;
