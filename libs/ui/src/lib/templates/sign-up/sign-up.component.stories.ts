import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'Templates / SignUpComponent',
  component: SignUpComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<SignUpComponent>;

const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primaryText: 'Welcome to Bite Sized',
  secondaryText: 'Where we do our best',
};
