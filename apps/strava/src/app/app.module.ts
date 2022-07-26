import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@jfc/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StravaService } from './services/strava.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, UiModule],
  providers: [StravaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
