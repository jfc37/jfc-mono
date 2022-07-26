import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
  Interval,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isWithinInterval,
  startOfToday,
} from 'date-fns';
import addYears from 'date-fns/addYears';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  StravaActivityDto,
  StravaService,
} from '../../services/strava.service';
import { DashboardChartModel } from '../components/dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'strava-dashboard-page',
  templateUrl: './dashboard.page.html',
})
export class DashboardPage implements OnInit {
  public displayName = 'Anonymous';
  public avatar = '';

  public last7DaysModel$!: Observable<DashboardChartModel>;
  public last6WeeksModel$!: Observable<DashboardChartModel>;
  public last12MonthsModel$!: Observable<DashboardChartModel>;

  constructor(private _router: Router, private _stravaService: StravaService) {}

  public ngOnInit(): void {
    if (this._stravaService.user) {
      this.displayName = [
        this._stravaService.user.firstname,
        this._stravaService.user.lastname,
      ]
        .filter(Boolean)
        .join(' ');
      this.avatar = this._stravaService.user.profile;
    }

    const activities$ = this._stravaService.getActivities();

    this.last7DaysModel$ = activities$.pipe(
      map(toLast7DaysModel),
      startWith(getLoadingModel())
    );

    this.last6WeeksModel$ = activities$.pipe(
      map(toLast6WeeksModel),
      startWith(getLoadingModel())
    );

    this.last12MonthsModel$ = activities$.pipe(
      map(toLast12MonthsModel),
      startWith(getLoadingModel())
    );
  }

  public async signOut(): Promise<void> {
    this._router.navigate(['/login']);
  }
}

function toLast7DaysModel(dtos: StravaActivityDto[]): DashboardChartModel {
  const sevenDayInterval = {
    start: addDays(startOfToday(), -6),
    end: startOfToday(),
  };
  const dates = eachDayOfInterval(sevenDayInterval);

  const dailyKms: Record<string, number> = getDailyKilometers(
    dates,
    dtos
  ).reduce((accum, date) => {
    const day = format(date.date, 'EEEE');
    return {
      ...accum,
      [day]: date.kilometers,
    };
  }, {});

  const totalKms = totalKilometersDuringInterval(dtos, sevenDayInterval);
  const previousSevenDayInterval = {
    start: addWeeks(addDays(startOfToday(), 1), -2),
    end: addWeeks(startOfToday(), -1),
  };
  const previousTotalKms = totalKilometersDuringInterval(
    dtos,
    previousSevenDayInterval
  );
  const percentageChange = calculatePercentageChange(
    previousTotalKms,
    totalKms
  );

  return {
    loading: false,
    title: 'Last 7 days',
    units: 'kms',
    heroData: `${totalKms} kms`,
    dataSet: dailyKms,
    percentageChange,
    chartType: 'area',
    minimalLines: true,
  };
}

function toLast6WeeksModel(dtos: StravaActivityDto[]): DashboardChartModel {
  const sixWeekInterval = {
    start: addWeeks(startOfToday(), -6),
    end: startOfToday(),
  };
  const dates = eachWeekOfInterval(sixWeekInterval);

  const weeklyKms: Record<string, number> = dates.reduce(
    (accum, date, index) => {
      const activitiesInWeek = dtos.filter(activity =>
        isSameWeek(new Date(activity.start_date_local), date)
      );
      const totalMetersInWeek = activitiesInWeek.reduce(sumDistance, 0);
      const totalKilometersInWeek = toKilometers(totalMetersInWeek);

      const label =
        index === 5
          ? 'Current week'
          : index === 4
          ? 'Last week'
          : `${6 - index} weeks ago`;

      return {
        ...accum,
        [label]: totalKilometersInWeek,
      };
    },
    {}
  );

  const totalKms = totalKilometersDuringInterval(dtos, sixWeekInterval);
  const previous6WeekInterval = {
    start: addWeeks(startOfToday(), -12),
    end: addWeeks(addDays(startOfToday(), -1), -6),
  };
  const previousTotalKms = totalKilometersDuringInterval(
    dtos,
    previous6WeekInterval
  );
  const percentageChange = calculatePercentageChange(
    previousTotalKms,
    totalKms
  );

  return {
    loading: false,
    title: 'Last 6 weeks',
    units: 'kms',
    heroData: `${totalKms} kms`,
    dataSet: weeklyKms,
    percentageChange,
    chartType: 'bar',
    minimalLines: true,
  };
}

function toLast12MonthsModel(dtos: StravaActivityDto[]): DashboardChartModel {
  const interval = {
    start: addYears(addMonths(startOfToday(), 1), -1),
    end: startOfToday(),
  };
  const dates = eachMonthOfInterval(interval);

  const monthlyKms: Record<string, number> = dates.reduce((accum, date) => {
    const activitiesInMonth = dtos.filter(activity =>
      isSameMonth(new Date(activity.start_date_local), date)
    );
    const totalMetersInMonth = activitiesInMonth.reduce(sumDistance, 0);
    const totalKilometersInMonth = toKilometers(totalMetersInMonth);

    return {
      ...accum,
      [format(date, 'MMM')]: totalKilometersInMonth,
    };
  }, {});

  const totalKms = totalKilometersDuringInterval(dtos, interval);

  return {
    loading: false,
    title: 'Last 12 months',
    units: 'kms',
    heroData: `${totalKms} kms`,
    dataSet: monthlyKms,
    chartType: 'bar',
    minimalLines: false,
  };
}

function totalKilometersDuringInterval(
  dtos: StravaActivityDto[],
  interval: Interval
): number {
  const totalMeters = dtos
    .filter(activity =>
      isWithinInterval(new Date(activity.start_date_local), interval)
    )
    .map(activity => activity.distance)
    .reduce((accum, val) => accum + val, 0);

  return toKilometers(totalMeters);
}

function getDailyKilometers(
  dates: Date[],
  dtos: StravaActivityDto[]
): { date: Date; kilometers: number }[] {
  return dates.map(date => {
    const activitiesWithinDay = dtos.filter(isSameDayFn(date));
    const totalMetersWithinDay = activitiesWithinDay.reduce(sumDistance, 0);
    const totalKilometersWithinDay = toKilometers(totalMetersWithinDay);

    return {
      date,
      kilometers: totalKilometersWithinDay,
    };
  });
}

function isSameDayFn(date: Date) {
  return (activity: StravaActivityDto) =>
    isSameDay(new Date(activity.start_date_local), date);
}

function sumDistance(
  currentTotal: number,
  activity: StravaActivityDto
): number {
  return currentTotal + activity.distance;
}

function toKilometers(meters: number): number {
  return Number((meters / 1000).toFixed(0));
}

function getLoadingModel(): DashboardChartModel {
  return {
    loading: true,
    dataSet: {},
    heroData: '',
    title: '',
    units: '',
    chartType: 'area',
    minimalLines: true,
  };
}

function calculatePercentageChange(
  original: number,
  current: number
): number | undefined {
  if (original === 0) {
    return undefined;
  }
  const delta = current - original;
  const percentageChange = (delta / original) * 100;
  return Number(percentageChange.toFixed(0));
}
