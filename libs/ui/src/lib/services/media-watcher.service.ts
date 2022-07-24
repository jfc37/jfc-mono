/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaWatcherService {
  private _onMediaChange: ReplaySubject<{
    matchingAliases: string[];
    matchingQueries: any;
  }> = new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(
    1
  );

  /**
   * Constructor
   */
  constructor(private _breakpointObserver: BreakpointObserver) {
    const breakpoints = {
      print: 'print',
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
    };

    this._breakpointObserver
      .observe(Object.values(breakpoints))
      .pipe(
        map((state) => {
          // Prepare the observable values and set their defaults
          const matchingAliases: string[] = [];
          const matchingQueries: any = {};

          // Get the matching breakpoints and use them to fill the subject
          const matchingBreakpoints =
            Object.entries(state.breakpoints).filter(
              ([query, matches]) => matches
            ) ?? [];
          for (const [query] of matchingBreakpoints) {
            // Find the alias of the matching query
            const matchingAlias = Object.entries(breakpoints).find(
              ([alias, q]) => q === query
            )?.[0];

            // Add the matching query to the observable values
            if (matchingAlias) {
              matchingAliases.push(matchingAlias);
              matchingQueries[matchingAlias] = query;
            }
          }

          // Execute the observable
          this._onMediaChange.next({
            matchingAliases,
            matchingQueries,
          });
        })
      )
      .subscribe();
  }

  /**
   * Getter for _onMediaChange
   */
  public get onMediaChange$(): Observable<{
    matchingAliases: string[];
    matchingQueries: any;
  }> {
    return this._onMediaChange.asObservable();
  }

  /**
   * On media query change
   *
   * @param query
   */
  public onMediaQueryChange$(
    query: string | string[]
  ): Observable<BreakpointState> {
    return this._breakpointObserver.observe(query);
  }
}
