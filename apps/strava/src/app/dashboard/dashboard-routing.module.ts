import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './pages/dashboard.page';
import { LoggedInGuard } from '../services/guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: DashboardPage, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
