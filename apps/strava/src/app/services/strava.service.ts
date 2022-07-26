import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addYears, startOfToday } from 'date-fns';
import { Observable, range } from 'rxjs';
import { concatMap, last, map, scan, share, takeWhile } from 'rxjs/operators';

const OAUTH_CONFIG = {
  url: 'https://www.strava.com/api/v3/oauth/token',
  clientId: '70233',
  clientSecret: 'ab5a8ccb2c8836d86bb16d420ff041637a2299e9',
};

const LOCAL_STORAGE_TOKEN = 'token';
const LOCAL_STORAGE_USER = 'user';
const LOCAL_STORAGE_EXPIRES_AT = 'expiresAt';

@Injectable()
export class StravaService {
  public user: StravaUser | undefined;

  private _token = '';

  constructor(private _httpClient: HttpClient) {
    this._loadUserDetails();
  }

  public get authenticationRequired(): boolean {
    return !this._token;
  }

  public async authenticate(code: string): Promise<void> {
    const payload = {
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
      code,
      grant_type: 'authorization_code',
    };
    const response = (await this._httpClient
      .post(OAUTH_CONFIG.url, payload)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .toPromise()) as any;
    this._token = response.access_token;
    this.user = response.athlete;

    this._saveAuthentication(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _saveAuthentication(authResponse: any): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, authResponse.access_token);
    localStorage.setItem(
      LOCAL_STORAGE_USER,
      JSON.stringify(authResponse.athlete)
    );
    localStorage.setItem(LOCAL_STORAGE_EXPIRES_AT, authResponse.expires_at);
  }

  private _loadUserDetails(): void {
    const expires = localStorage.getItem(LOCAL_STORAGE_EXPIRES_AT);
    if (expires && Number(expires) < new Date().getTime() / 1000) {
      localStorage.removeItem(LOCAL_STORAGE_USER);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_EXPIRES_AT);
    } else {
      this._token = localStorage.getItem(LOCAL_STORAGE_TOKEN) || '';
      const userString = localStorage.getItem(LOCAL_STORAGE_USER);
      if (userString) {
        this.user = JSON.parse(userString);
      }
    }
  }

  public getActivities(): Observable<StravaActivityDto[]> {
    // return of(getDummyActivities() as StravaActivityDto[]).pipe(delay(100));
    const oneYearAgo = addYears(startOfToday(), -1).getTime() / 1000;
    return range(1, 5).pipe(
      map(
        page =>
          `https://www.strava.com/api/v3/athlete/activities?after=${oneYearAgo}&per_page=200&page=${page}`
      ),
      concatMap(url =>
        this._httpClient.get<StravaActivityDto[]>(url, {
          headers: {
            Authorization: `Bearer ${this._token}`,
          },
        })
      ),
      takeWhile(dtos => dtos.length > 0),
      scan((accum, curr) => [...accum, ...curr], [] as StravaActivityDto[]),
      last(),
      share()
    );
  }
}

export interface StravaUser {
  firstname: string;
  lastname: string;
  profile: string;
}

export interface StravaActivityDto {
  name: string;
  distance: number; //in meters
  moving_time: number; //in seconds
  elapsed_time: number; // in seconds
  type: 'Run' | 'VirtualRun' | 'Walk' | 'Ride' | 'VirtualRide';
  start_date: string; //yyy-mm-ddThh:mm:ssZ
  start_date_local: string; //yyy-mm-ddThh:mm:ssZ
  average_speed: number; // m/s
  max_speed: number; // m/s
  suffer_score: number;
}
