import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

export class TranslateServerLoader implements TranslateLoader {

  getTranslation(lang: string): Observable<any> {

    const filePath = path.join(process.cwd(), 'public/assets/i18n', `${lang}.json`);

    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return of(json);
  }

}