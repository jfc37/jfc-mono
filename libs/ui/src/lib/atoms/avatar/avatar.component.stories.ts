import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Atoms/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<AvatarComponent>;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://angular-material.fusetheme.com/assets/images/avatars/brian-hughes.jpg',
  initials: 'JC',
};
