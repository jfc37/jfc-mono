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
   * Width of the content
   */
  @Input()
  public width: string = '400px';

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
