import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiModule } from '../../ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { VerticalNavigationComponent } from './vertical-navigation.component';

export default {
  title: 'Molecules / VerticalNavigationComponent',
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
});

export const Primary = Template.bind({});
Primary.argTypes = {};
Primary.args = {
  navigationItems: [
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
      title: 'Basic 2',
      route: '/basic-2',
      icon: 'heroicons_outline:ban',
      type: 'basic',
    },
  ],
};
