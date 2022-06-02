import Scheduling from '../../../../models/scheduling';

interface ILoadJson {
  loadJson(): Promise<Array<Scheduling>>;
}

export default ILoadJson;
