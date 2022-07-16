import { Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input()
  public src!: string;
}
