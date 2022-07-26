import { NgModule } from '@angular/core';
import { UiModule } from '@jfc/ui';
import { LoginRoutingModule } from './login-routing.module';

import { LoginPage } from './pages/login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [LoginRoutingModule, UiModule],
})
export class LoginModule {}
