import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { VerticalNavigationComponent } from './vertical-navigation.component';

export default {
  title: 'Molecules / Vertical Navigation',
  component: VerticalNavigationComponent,
  decorators: [
    moduleMetadata({
      imports: [UiModule, RouterTestingModule],
    }),
  ],
} as Meta<VerticalNavigationComponent>;

const Template: Story<VerticalNavigationComponent> = (
  args: VerticalNavigationComponent
) => ({
  props: args,
  template: `
  <jfc-vertical-navigation [navigationItems]="navigationItems">
    <jfc-user-summary initials="TB" title="Tom Brady" subtitle="tom.brady@nfl.com"></jfc-user-summary>
  </jfc-vertical-navigation>
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
