import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard {

constructor(
  private _auth: AuthService,
  private _router: Router
) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  if (this._auth.isLoggedIn()) {
    return true;
  }
// navigate to login page
  this._router.navigate(['/login']);
  // you can save redirect url so after authing we can move them back to the page they requested
  return false;
}

}
