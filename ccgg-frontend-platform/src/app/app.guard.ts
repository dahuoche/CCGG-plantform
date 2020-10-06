import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './service/auth.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isTokenExpired()) {
        this.authService.loggedIn.next(true);
        this.authService.getUser().subscribe();
        return true;
      }
      this.authService.loggedIn.next(false);
      this.router.navigate(['/login']);
      return false;
    }
}
