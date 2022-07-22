import { Component, Input } from '@angular/core';
import { BasicNavigationItem } from '../vertical-navigation-basic-item/vertical-navigation-basic-item.component';

@Component({
  selector: 'jfc-vertical-navigation-group-item',
  templateUrl: './vertical-navigation-group-item.component.html',
  styleUrls: ['./vertical-navigation-group-item.component.scss'],
})
export class VerticalNavigationGroupItemComponent {
  @Input()
  public item!: GroupNavigationItem;

  public isOpen = false;

  public get icon(): string {
    return this.isOpen
      ? 'heroicons_outline:chevron-down'
      : 'heroicons_outline:chevron-right';
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }
}

export interface GroupNavigationItem {
  title: string;
  icon?: string;
  children: BasicNavigationItem[];
  type: 'group';
}
