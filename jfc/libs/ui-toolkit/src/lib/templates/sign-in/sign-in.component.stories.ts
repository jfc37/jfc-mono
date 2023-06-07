import { Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { SignInComponent } from './sign-in.component';
import { provideAnimations } from '@angular/platform-browser/animations';

export default {
  title: 'Templates / Sign In',
  component: SignInComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [SignInComponent],
      declarations: [],
    }),
  ],
} as Meta<SignInComponent>;

export const Primary = {
  render: (args: SignInComponent) => ({
    props: args,
  }),
  args: {},
};
