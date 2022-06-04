import Scheduling from '../../../../models/Scheduling';

interface ISaveJson {
  saveJson(schedulings: Array<Scheduling>): Promise<void>;
}

export default ISaveJson;
