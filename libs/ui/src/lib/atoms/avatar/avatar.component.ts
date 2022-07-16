import { Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
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
}
