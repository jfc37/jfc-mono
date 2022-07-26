import { Component, Input, OnInit } from '@angular/core';
import { map, first, Observable, tap } from 'rxjs';
import { NavigationTypes } from '../../molecules/vertical-navigation/vertical-navigation.component';
import { MediaWatcherService } from '../../services/media-watcher.service';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @Input()
  public navigationItems: NavigationTypes[] = [];

  public showNavigation = true;
  public isScreenSmall$!: Observable<boolean>;

  constructor(private _mediaWatcher: MediaWatcherService) {}

  public ngOnInit(): void {
    this.isScreenSmall$ = this._mediaWatcher.onMediaChange$.pipe(
      tap(console.error.bind(null, 'xxx')),
      map(({ matchingAliases }) => !matchingAliases.includes('lg'))
    );

    this.isScreenSmall$
      .pipe(first())
      .subscribe((isSmallScreen) => (this.showNavigation = !isSmallScreen));
  }
  public toggle(): void {
    this.showNavigation = !this.showNavigation;
  }
}
