import files from 'fs';
import { PATH_JSON } from '../../../../constants/pathjson';
import Scheduling from '../../../../models/scheduling';
import ISaveJson from '../contract/saveJson.interface';

class SaveJsonImplementations implements ISaveJson {
  async saveJson(schedulings: Array<Scheduling>): Promise<void> {
    return files.writeFileSync(
      PATH_JSON,
      JSON.stringify(schedulings, null, 2),
      'utf-8',
    );
  }
}

export default SaveJsonImplementations;
