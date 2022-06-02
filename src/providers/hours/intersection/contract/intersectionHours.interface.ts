import Interval from '../../../../models/interval';

interface IIntersectionHours {
  exists(intervals: Array<Interval>): Promise<boolean>;
}

export default IIntersectionHours;
