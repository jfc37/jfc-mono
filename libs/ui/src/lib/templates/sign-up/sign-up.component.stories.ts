import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Templates / SignUpComponent',
  component: SignUpComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule, RouterTestingModule],
    }),
  ],
} as Meta<SignUpComponent>;

const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.argTypes = {
  signUp: { action: 'sign up' },
  alertType: {
    defaultValue: 'error',
    options: ['info', 'success', 'warning', 'error'],
    control: { type: 'select' },
  },
};
Primary.args = {
  heroText: 'Welcome to Bite Sized',
  subtitle: 'Where all the bites are sized small',
  logoUrl: 'storybook/logos/logo.svg',
  loading: false,
  signInRoute: '/sign-in',
  requireName: true,
  requireEmail: true,
  requirePassword: false,
  alertType: 'error',
  alertMessage: 'Oops, something went wrong',
  signUpText: 'Sign up',
  termsOfServiceRoute: '/terms-of-service',
};
