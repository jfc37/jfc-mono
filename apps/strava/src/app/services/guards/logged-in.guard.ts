import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StravaService } from '../strava.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private _stravaService: StravaService, private _router: Router) {}

  canActivate(): boolean {
    if (this._stravaService.authenticationRequired) {
      this._router.navigate(['/login']);
    }

    return !this._stravaService.authenticationRequired;
  }
}
