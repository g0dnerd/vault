import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  load() {
    const jsonFile = `/environments/${environment.name}.json`;

    return new Promise<void>((resolve, reject) => {
      firstValueFrom(this.http.get(jsonFile))
        .then((response) => {
          this.settings = response;
          resolve();
        })
        .catch((response) =>
          reject(`Could not load file ${jsonFile}: ${JSON.stringify(response)}`)
        );
    });
  }

  get(key: string) {
    return this.settings[key];
  }
}
