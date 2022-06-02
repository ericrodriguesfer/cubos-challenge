import files from 'fs';
import { PATH_JSON } from '../../../../constants/pathjson';
import ILoadJson from '../contract/ILoadJson';

class LoadJsonImplementations implements ILoadJson {
  async loadJson(): Promise<any> {
    return JSON.parse(
      files.existsSync(PATH_JSON)
        ? files.readFileSync(PATH_JSON).toString()
        : '""',
    );
  }
}

export default LoadJsonImplementations;
