import { Component } from '@angular/core';

@Component({
  selector: 'strava-login-page',
  templateUrl: './login.page.html',
})
export class LoginPage {
  public loading = false;

  public async signIn(): Promise<void> {
    this.loading = true;

    window.location.href = `http://www.strava.com/oauth/authorize?client_id=70233&response_type=code&redirect_uri=${document.baseURI}exchange-token&approval_prompt=force&scope=activity:read_all
    `;
  }
}
