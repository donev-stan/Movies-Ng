import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, Observable } from 'rxjs';
import { MovieDBService } from './movie-db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private previousUrl = '/home';

  constructor(private db: MovieDBService, private router: Router) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('prev:', event.url);
        this.previousUrl = event.url;
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.db.isLoggedIn()) return true;

    this.router.navigate([this.previousUrl]);
    return false;
  }
}
