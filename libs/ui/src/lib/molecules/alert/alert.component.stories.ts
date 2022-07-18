import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { AlertAppearance, AlertComponent } from './alert.component';

export default {
  argTypes: {
    type: {
      defaultValue: 'success',
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
    appearance: {
      defaultValue: 'soft',
      options: ['soft', 'outline', 'fill'] as AlertAppearance[],
      control: { type: 'select' },
    },
    showIcon: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    dismissible: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    text: {
      defaultValue: 'Lorem ipsum',
      control: { type: 'text' },
    },
    title: {
      defaultValue: 'Hello 👋',
      control: { type: 'text' },
    },
    customIcon: {
      defaultValue: '',
      options: [
        'heroicons_solid:cake',
        'feather:dollar-sign',
        'mat_outline:add_moderator',
      ],
      control: { type: 'select' },
    },
  },
  title: 'Molecules/Alert',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule],
    }),
  ],
} as Meta<AlertComponent>;

const Template: Story<AlertComponent & { text: string; title: string }> = (
  args: AlertComponent & { text: string; title: string }
) => ({
  component: AlertComponent,
  props: args,
  template: `
  <jfc-alert
    [appearance]="appearance"
    [showIcon]="showIcon"
    [dismissible]="dismissible"
    [dismissed]="dismissed"
    [customIcon]="customIcon"
    [type]="type"
    > {{text}}
    <div alertTitle>{{title}}</div>
  </jfc-alert>`,
});

export const Default = Template.bind({});
Default.args = { type: 'error' };
