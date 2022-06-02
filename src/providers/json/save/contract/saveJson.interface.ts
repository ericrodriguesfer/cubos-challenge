import Scheduling from '../../../../models/scheduling';

interface ISaveJson {
  saveJson(schedulings: Array<Scheduling>): Promise<void>;
}

export default ISaveJson;
