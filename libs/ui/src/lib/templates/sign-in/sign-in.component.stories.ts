import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { SignInComponent } from './sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Templates / SignInComponent',
  component: SignInComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule, RouterTestingModule],
    }),
  ],
} as Meta<SignInComponent>;

const Template: Story<SignInComponent> = (args: SignInComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.argTypes = {
  signIn: { action: 'sign in' },
  signInAnonymously: { action: 'sign in anonymously' },
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
  loading: true,
  signUpRoute: '/sign-up',
  requirePassword: false,
  requireEmail: true,
  forgotPasswordRoute: '',
  alertType: 'error',
  alertMessage: 'Oops, something went wrong',
  allowAnonymousSignIn: true,
  signInText: 'Sign in',
};