import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../../services/strava.service';

@Component({
  selector: 'strava-token-exchange-page',
  templateUrl: './token-exchange.page.html',
})
export class TokenExchangePage implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _stravaService: StravaService
  ) {}

  public async ngOnInit(): Promise<void> {
    const code = this._route.snapshot.queryParamMap.get('code');
    if (code) {
      await this._stravaService.authenticate(code);
      this._router.navigate(['/dashboard']);
    } else {
      console.error('No code in query params');
    }
  }
}
