import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { SignInComponent } from './sign-in.component';

export default {
  title: 'Templates / SignInComponent',
  component: SignInComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule],
    }),
  ],
} as Meta<SignInComponent>;

const Template: Story<SignInComponent> = (args: SignInComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  heroText: 'Welcome to Bite Sized',
};
