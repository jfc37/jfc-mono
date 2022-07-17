import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { AlertComponent } from './alert.component';

export default {
  title: 'AlertComponent',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule],
    }),
  ],
} as Meta<AlertComponent>;

// const Template: Story<AlertComponent> = (args: AlertComponent) => ({
//   component: AlertComponent,
//   props: args,
//   template: `
//   <jfc-alert
//     [showIcon]="showIcon"
//     [dismissible]="dismissible"
//     [customIcon]="customIcon"
//     > {{innerText}}
//     <div alertTitle>{{title}}</div>
//   </jfc-alert>`,
// });

const Template: Story<AlertComponent> = (args: AlertComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  innerText: 'Hello there mister',
};
