import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Layout component that centers its content
 */
@Component({
  selector: 'jfc-center-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './center-layout.component.html',
  styleUrls: ['./center-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterLayoutComponent {
  /**
   * Max width of the content
   * Content will take up the full width until it reaches this max width
   */
  @Input()
  public maxWidth: string = '850px';

  /**
   * Padding around the content
   */
  @Input()
  public padding: string = '1rem';

  /**
   * Background color of the side bars
   */
  @Input()
  public backgroundColor: string = 'black';

  /**
   * Background color of the content
   */
  @Input()
  public contentBackgroundColor: string = 'white';

  @HostBinding('style.backgroundColor') get getBackgroundColor() {
    return this.backgroundColor;
  }
}
