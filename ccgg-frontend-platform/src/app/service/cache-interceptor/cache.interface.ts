import {HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface CacheInterface {
  get(req: HttpRequest<any>): HttpResponse<any> | null;
  put(req: HttpRequest<any>, res: HttpResponse<any>): void;
}

