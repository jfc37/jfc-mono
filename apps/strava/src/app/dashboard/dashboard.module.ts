import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './pages/dashboard.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';

@NgModule({
  declarations: [DashboardPage, DashboardChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
