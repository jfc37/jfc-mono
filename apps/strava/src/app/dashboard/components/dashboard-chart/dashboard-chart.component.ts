import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexGrid,
  ApexOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

@Component({
  selector: 'strava-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartComponent {
  @Input()
  public model!: DashboardChartModel | null;

  public chartConversions!: ApexOptions;

  public get chart(): ApexChart {
    return {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: this.model?.chartType || 'area',
      sparkline: {
        enabled: this.model?.minimalLines ?? true,
      },
    };
  }

  public grid: ApexGrid = {
    show: false,
  };

  public colors = ['#38BDF8'];
  public get series(): ApexAxisChartSeries {
    if (!this.model) {
      return [];
    }
    return [
      {
        name: this.model.units,
        data: Object.values(this.model.dataSet),
      },
    ];
  }

  public stroke: ApexStroke = {
    curve: 'smooth',
  };

  public tooltip: ApexTooltip = {
    followCursor: true,
    theme: 'dark',
  };
  public get xaxis(): ApexXAxis {
    return {
      type: 'category',
      categories: this.model ? Object.keys(this.model.dataSet) : [],
      tickPlacement: 'on',
    };
  }
  public yaxis: ApexYAxis = {
    show: true,
  };

  public get showPercentageChange(): boolean {
    return this.model?.percentageChange != null;
  }

  public get percentageChangeIcon(): string {
    return (this.model?.percentageChange || 0) < 0
      ? 'heroicons_solid:trending-down'
      : 'heroicons_solid:trending-up';
  }

  public get percentageChangeColourClass(): string {
    return (this.model?.percentageChange || 0) < 0
      ? 'text-red-500'
      : 'text-green-500';
  }
}

export interface DashboardChartModel {
  title: string;
  chartType: 'area' | 'bar';
  loading: boolean;
  heroData: string;
  units: string;
  minimalLines: boolean;
  percentageChange?: number;
  dataSet: Record<string, number>;
}
