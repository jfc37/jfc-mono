import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from './atoms/avatar/avatar.component';
import { UserSummaryComponent } from './molecules/user-summary/user-summary.component';
import { SignUpComponent } from './templates/sign-up/sign-up.component';
import { AlertComponent } from './molecules/alert/alert.component';
import { IconsModule } from './styles/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, MatIconModule, IconsModule, HttpClientModule],
  declarations: [
    AvatarComponent,
    UserSummaryComponent,
    SignUpComponent,
    AlertComponent,
  ],
  exports: [
    AvatarComponent,
    UserSummaryComponent,
    SignUpComponent,
    AlertComponent,
  ],
})
export class UiModule {}
