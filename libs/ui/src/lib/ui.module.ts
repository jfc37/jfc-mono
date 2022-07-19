import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarComponent } from './atoms/avatar/avatar.component';
import { UserSummaryComponent } from './molecules/user-summary/user-summary.component';
import { AlertComponent } from './molecules/alert/alert.component';
import { IconsModule } from './styles/icons/icons.module';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './templates/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    IconsModule,
    HttpClientModule,
  ],
  declarations: [
    AvatarComponent,
    UserSummaryComponent,
    SignInComponent,
    AlertComponent,
  ],
  exports: [
    AvatarComponent,
    UserSummaryComponent,
    SignInComponent,
    AlertComponent,
  ],
})
export class UiModule {}
