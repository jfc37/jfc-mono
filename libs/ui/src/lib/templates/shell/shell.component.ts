import { Component, Input } from '@angular/core';
import { NavigationTypes } from '../../molecules/vertical-navigation/vertical-navigation.component';

@Component({
  selector: 'jfc-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  @Input()
  public navigationItems: NavigationTypes[] = [];

  public showNavigation = true;

  public toggle(): void {
    this.showNavigation = !this.showNavigation;
  }
}
