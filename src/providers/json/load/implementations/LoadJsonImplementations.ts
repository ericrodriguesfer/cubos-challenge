import files from 'fs';
import { PATH_JSON } from '../../../../constants/PathJson';
import Scheduling from '../../../../models/Scheduling';
import ILoadJson from '../contract/LoadJsonContract';

class LoadJsonImplementations implements ILoadJson {
  async loadJson(): Promise<Array<Scheduling>> {
    return JSON.parse(
      files.existsSync(PATH_JSON)
        ? files.readFileSync(PATH_JSON, 'utf-8').toString()
        : '""',
    );
  }
}

export default LoadJsonImplementations;
