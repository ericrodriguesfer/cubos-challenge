import Scheduling from '../../../../models/Scheduling';

interface ILoadJson {
  loadJson(): Promise<Array<Scheduling>>;
}

export default ILoadJson;
