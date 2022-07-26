import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './styles/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    IconsModule,
    RouterTestingModule,
  ],
})
export class UiStorybookModule {}
