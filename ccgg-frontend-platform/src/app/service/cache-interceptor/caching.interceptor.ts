import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CacheService} from './cache.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {API_URL} from './cache-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRequestCachable(req)) {
      // console.log('return next.handle(req);');
      return next.handle(req);
    }

    const cacheResponse = this.cacheService.get(req);
    if (cacheResponse !== null) {
      // console.log('return of(cacheResponse)');
      return of(cacheResponse);
    }

    return next.handle(req).pipe(
      tap(res => {
        // console.log('this.cacheService.put(req, res);');
        if (res instanceof HttpResponse) {
          this.cacheService.put(req, res);
        }
      })
    );
  }


  private isRequestCachable(req: HttpRequest<any>) {
    // console.log('isRequestCachable working');
    return (req.method === 'GET') && (req.url === API_URL + '/api/questions');
  }
}
