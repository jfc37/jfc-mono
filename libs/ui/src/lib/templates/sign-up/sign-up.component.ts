import { Component, Input } from '@angular/core';

@Component({
  selector: 'jfc-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  @Input()
  public primaryText!: string;

  @Input()
  public secondaryText!: string;

  @Input()
  public logoSrc!: string;

  @Input()
  public signInRoute!: string;
}
