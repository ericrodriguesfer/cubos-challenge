import files from 'fs';
import { PATH_JSON } from '../../../../constants/pathjson';
import ISaveJson from '../contract/ISaveJson';

class SaveJsonImplementations implements ISaveJson {
  async saveJson(json: string): Promise<any> {
    return files.writeFileSync(PATH_JSON, JSON.stringify(json, null, 2));
  }
}

export default SaveJsonImplementations;
