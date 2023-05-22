import { Meta } from '@storybook/angular';
import { CenterLayoutComponent } from './center-layout.component';

export default {
  title: 'CenterLayoutComponent',
  component: CenterLayoutComponent,
} as Meta<CenterLayoutComponent>;

export const Primary = {
  render: (args: CenterLayoutComponent) => ({
    props: args,
  }),
  args: {},
};
