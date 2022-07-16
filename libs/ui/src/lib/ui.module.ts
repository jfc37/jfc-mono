import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './atoms/avatar/avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class UiModule {}
