import { Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-vertical-navigation-text-item',
  templateUrl: './vertical-navigation-text-item.component.html',
  styleUrls: ['./vertical-navigation-text-item.component.scss'],
})
export class VerticalNavigationTextItemComponent {
  @Input()
  public item!: TextNavigationItem;
}

export interface TextNavigationItem {
  title: string;
  subtext: string;
  type: 'text';
}
