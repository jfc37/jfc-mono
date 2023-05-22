import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter([], withEnabledBlockingInitialNavigation())],
};
