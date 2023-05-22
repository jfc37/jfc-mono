import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jfc-ui-toolkit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-toolkit.component.html',
  styleUrls: ['./ui-toolkit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToolkitComponent {}
