import files from 'fs';
import { PATH_JSON } from '../../../../constants/pathjson';
import Scheduling from '../../../../models/scheduling';
import ILoadJson from '../contract/loadJson.interface';

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
