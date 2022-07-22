import { Component } from '@angular/core';

@Component({
  selector: 'jfc-vertical-navigation-divider-item',
  templateUrl: './vertical-navigation-divider-item.component.html',
  styleUrls: ['./vertical-navigation-divider-item.component.scss'],
})
export class VerticalNavigationDividerItemComponent {}

export interface DivderNavigationItem {
  type: 'divider';
}
