import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jfc-center-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './center-layout.component.html',
  styleUrls: ['./center-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterLayoutComponent {}
