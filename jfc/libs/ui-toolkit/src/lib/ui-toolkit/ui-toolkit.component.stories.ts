import { Meta } from '@storybook/angular';
import { UiToolkitComponent } from './ui-toolkit.component';

export default {
  title: 'UiToolkitComponent',
  component: UiToolkitComponent,
} as Meta<UiToolkitComponent>;

export const Primary = {
  render: (args: UiToolkitComponent) => ({
    props: args,
  }),
  args: {},
};
