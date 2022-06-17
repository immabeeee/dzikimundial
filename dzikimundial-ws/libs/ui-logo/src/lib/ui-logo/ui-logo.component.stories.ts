import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiLogoComponent } from './ui-logo.component';

export default {
  title: 'UiLogoComponent',
  component: UiLogoComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UiLogoComponent>;

const Template: Story<UiLogoComponent> = (args: UiLogoComponent) => ({
  component: UiLogoComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}