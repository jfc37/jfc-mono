import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jfc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input()
  public showToggle!: boolean;

  @Output()
  public toggle = new EventEmitter<void>();
}
