import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UserSummaryComponent } from './user-summary.component';
import { UiModule } from '../../ui.module';

export default {
  title: 'Molecules/User Summary',
  component: UserSummaryComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule],
    }),
  ],
} as Meta<UserSummaryComponent>;

const Template: Story<UserSummaryComponent> = (args: UserSummaryComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://angular-material.fusetheme.com/assets/images/avatars/brian-hughes.jpg',
  initials: 'TB',
  title: 'Tom Brady',
  subtitle: 'Tampa Bay QB',
};
