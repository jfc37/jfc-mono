import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-vertical-navigation-basic-item',
  templateUrl: './vertical-navigation-basic-item.component.html',
  styleUrls: ['./vertical-navigation-basic-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavigationBasicItemComponent {
  @Input()
  public item!: BasicNavigationItem;
}

export interface BasicNavigationItem {
  title: string;
  route: string;
  icon?: string;
  type: 'basic';
}
