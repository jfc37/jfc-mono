import { Meta } from '@storybook/angular';
import { CenterLayoutComponent } from './center-layout.component';

export default {
  title: 'Layouts / Center',
  component: CenterLayoutComponent,
  argTypes: {
    maxWidth: {
      control: 'text',
    },
    backgroundColor: {
      control: 'color',
    },
    contentBackgroundColor: {
      control: 'color',
    },
  },
} as Meta<CenterLayoutComponent>;

export const Default = (args: CenterLayoutComponent) => ({
  component: CenterLayoutComponent,
  template: `<jfc-center-layout>{{content}}</jfc-center-layout>`,
  props: {
    ...args,
    content: 'Something',
  },
});

export const Editable = (args: CenterLayoutComponent) => ({
  component: CenterLayoutComponent,
  props: args,
  template: `<jfc-center-layout
    [maxWidth]="maxWidth"
    [backgroundColor]="backgroundColor"
    [contentBackgroundColor]="contentBackgroundColor"
    >{{content}}</jfc-center-layout>`,
});
Editable.args = {
  maxWidth: '400px',
  backgroundColor: 'grey',
  contentBackgroundColor: 'whitesmoke',
  content: 'Something',
};
