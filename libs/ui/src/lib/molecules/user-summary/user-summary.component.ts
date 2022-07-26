import { Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-user-summary',
  templateUrl: './user-summary.component.html',
})
export class UserSummaryComponent {
  /**
   * Url source for the avatar image
   */
  @Input()
  public src!: string;

  /**
   * User's initials
   * Will be displayed if no src is provided
   */
  @Input()
  public initials!: string;

  @Input()
  public title!: string;

  @Input()
  public subtitle!: string;
}
