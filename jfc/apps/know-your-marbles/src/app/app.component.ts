import { Component } from '@angular/core';
import { CenterLayoutComponent } from '@jfc/ui-toolkit';

@Component({
  standalone: true,
  selector: 'jfc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CenterLayoutComponent],
})
export class AppComponent {}
