import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiNavLinkComponent } from './ui-nav-link.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'UiNavLinkComponent',
  component: UiNavLinkComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    })
  ],
} as Meta<UiNavLinkComponent>;

const Template: Story<UiNavLinkComponent> = (args: UiNavLinkComponent) => ({
  component: UiNavLinkComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  name: 'button-nasme',
  text: 'Lorem ipsum',
  link: '/sport'
}

export const Secondary = Template.bind({});
Primary.args = {
  name: 'button-nasme',
  text: 'Lorem ipsum',
  link: '/sport',
  isSecondary: true
}