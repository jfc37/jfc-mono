import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { UiStorybookModule } from '../../ui-story.module';
import { MatIconModule } from '@angular/material/icon';
import { TopBarComponent } from './top-bar.component';

export default {
  title: 'Molecules/Top Bar',
  component: TopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule, UiStorybookModule, MatIconModule],
    }),
  ],
  argTypes: {
    toggle: { action: 'toggle' },
  },
} as Meta<TopBarComponent>;

const Template: Story<TopBarComponent> = (args: TopBarComponent) => ({
  component: TopBarComponent,
  props: args,
  template: `
  <jfc-top-bar [showToggle]="showToggle" (toggle)="toggle()">
    <button mat-icon-button>
      <mat-icon svgIcon="heroicons_outline:adjustments"></mat-icon>
    </button>
    <button mat-icon-button>
      <mat-icon svgIcon="heroicons_outline:beaker"></mat-icon>
    </button>
  </jfc-top-bar>`,
});

export const Default = Template.bind({});
Default.args = {
  showToggle: true,
};
