import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './atoms/avatar/avatar.component';
import { UserSummaryComponent } from './molecules/user-summary/user-summary.component';
import { SignUpComponent } from './templates/sign-up/sign-up.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AvatarComponent, UserSummaryComponent, SignUpComponent],
  exports: [AvatarComponent, UserSummaryComponent, SignUpComponent],
})
export class UiModule {}
