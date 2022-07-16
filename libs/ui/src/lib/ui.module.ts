import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './atoms/avatar/avatar.component';
import { UserSummaryComponent } from './molecules/user-summary/user-summary.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AvatarComponent, UserSummaryComponent],
  exports: [AvatarComponent, UserSummaryComponent],
})
export class UiModule {}
