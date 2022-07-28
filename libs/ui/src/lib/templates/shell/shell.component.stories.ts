import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { UiStorybookModule } from '../../ui-story.module';
import { ShellComponent } from './shell.component';

export default {
  title: 'Molecules / Shell',
  component: ShellComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule, UiStorybookModule],
    }),
  ],
} as Meta<ShellComponent>;

const Template: Story<ShellComponent> = (args: ShellComponent) => ({
  props: args,
  template: `
  <jfc-shell [navigationItems]="navigationItems">
    <h1>Hello there, from the shell!</h1>
    <jfc-user-summary
      navSlot
      initials="TB"
      title="Tom Brady"
      subtitle="tom.brady@nfl.com"
    ></jfc-user-summary>
    <div topBarSlot>Hello Tom!</div>
  </jfc-shell>
  `,
});

export const Primary = Template.bind({});
Primary.argTypes = {};
Primary.args = {
  navigationItems: [
    {
      title: 'Basics',
      subtext: 'Just the basics',
      type: 'text',
    },
    {
      title: 'Basic 1',
      route: '/basic-1',
      icon: 'heroicons_outline:bell',
      type: 'basic',
    },
    {
      title: 'No icon',
      route: '/no-icon',
      type: 'basic',
    },
    {
      type: 'divider',
    },
    {
      title: 'Basic 2',
      route: '/basic-2',
      icon: 'heroicons_outline:ban',
      type: 'basic',
    },
    {
      title: 'Group 1',
      type: 'group',
      icon: 'heroicons_outline:bell',
      children: [
        {
          title: 'Child A',
          route: '/child-a',
          type: 'basic',
          icon: 'heroicons_outline:bell',
        },
        {
          title: 'Child B',
          route: '/child-b',
          type: 'basic',
          icon: 'heroicons_outline:bell',
        },
      ],
    },
  ],
};
