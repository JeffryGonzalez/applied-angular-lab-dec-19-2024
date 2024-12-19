import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FEATURE_FLAG_URL } from '.';

export class FeaturesService {
  #client = inject(HttpClient);

  public getEnabledFeatures() {
    return this.#client.get<string[]>(FEATURE_FLAG_URL);
  }
}
