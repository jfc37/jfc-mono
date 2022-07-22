import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasicNavigationItem } from './vertical-navigation-basic-item/vertical-navigation-basic-item.component';
import { TextNavigationItem } from './vertical-navigation-text-item/vertical-navigation-text-item.component';

@Component({
  selector: 'jfc-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavigationComponent {
  @Input()
  navigationItems: NavigationTypes[] = [];
}

export type NavigationTypes = BasicNavigationItem | TextNavigationItem;
