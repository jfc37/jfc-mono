import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { toolkitAnimations } from '../../styles/animations';

/**
 * Alert to convey some message
 *
 * Alert with just a message:
 * `` `
 * <toolkit-alert>
 *              Hello 👋
 * </toolkit-alert>
 * `` `
 *
 * Alert with a title:
 * `` `
 * <toolkit-alert>
 *               Hello 👋
 *               <span alertTitle>Look here!</span>
 * </toolkit-alert>
 * `` `
 */
@Component({
  selector: 'jfc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: toolkitAnimations,
  exportAs: 'jfcAlert',
})
export class AlertComponent {
  /**
   * How the alert will appear
   * Options are: fill | outline | soft
   */
  @Input()
  public appearance: AlertAppearance = 'outline';

  /**
   * Display a custom icon, instead of default icon for type of alert
   * Remember to set `showIcon` to true for custom icon to show
   */
  @Input()
  public customIcon = '';

  /**
   * Whether the alert is displayed or not
   */
  @Input()
  public dismissed = false;

  /**
   * Can the alert be dismissed by the user?
   * Close button will be displayed if true
   */
  @Input()
  public dismissible = false;

  /**
   * Should an icon be displayed in the alert?
   * Can either provide a custom icon, otherwise the type of alert will determine the icon
   */
  @Input()
  public showIcon = false;

  /**
   * The type of alert
   * Options are: info | success | warning | error
   */
  @Input()
  public type: AlertType = 'info';

  /**
   * @ignore
   */
  public get icon(): string {
    return this.customIcon || TYPE_ICONS[this.type];
  }

  public get classes(): string[] {
    return ALERT_CLASSES[this.type][this.appearance];
  }

  /**
   * Dismiss the alert
   * @ignore
   */
  public dismiss(): void {
    this.dismissed = true;
  }
}

/**
 * Default icon to display for each alert type
 */
const TYPE_ICONS: Record<AlertType, string> = {
  info: 'heroicons_solid:information-circle',
  success: 'heroicons_solid:check-circle',
  warning: 'heroicons_solid:exclamation',
  error: 'heroicons_solid:x-circle',
};

const ALERT_CLASSES: Record<AlertType, Record<AlertAppearance, string[]>> = {
  info: {
    fill: ['bg-blue-600', 'text-white'],
    soft: ['bg-blue-100/60', 'text-blue-700'],
    outline: ['bg-blue-100/60', 'text-blue-700', 'border', 'border-blue-400'],
  },
  success: {
    fill: ['bg-green-600', 'text-white'],
    soft: ['bg-green-100/60', 'text-green-700'],
    outline: [
      'bg-green-100/60',
      'text-green-700',
      'border',
      'border-green-400',
    ],
  },
  warning: {
    fill: ['bg-yellow-500', 'text-white'],
    soft: ['bg-orange-100/60', 'text-orange-700'],
    outline: [
      'bg-orange-100/60',
      'text-orange-700',
      'border',
      'border-orange-400',
    ],
  },
  error: {
    fill: ['bg-red-600', 'text-white'],
    soft: ['bg-red-100/60', 'text-red-700'],
    outline: ['bg-red-100/60', 'text-red-700', 'border', 'border-red-400'],
  },
};

export type AlertAppearance = 'fill' | 'outline' | 'soft';

export type AlertType = 'info' | 'success' | 'warning' | 'error';
