import {environment} from '../../../environments/environment';
import {HttpResponse} from '@angular/common/http';

export const MAX_CACHE_AGE = 1000000;
export const API_URL = `${environment.API_URL}`

export interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  entryTime: number;
}
