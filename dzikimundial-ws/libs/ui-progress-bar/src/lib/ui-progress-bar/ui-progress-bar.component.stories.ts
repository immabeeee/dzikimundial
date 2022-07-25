import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiProgressBarComponent } from './ui-progress-bar.component';

export default {
  title: 'UiProgressBarComponent',
  component: UiProgressBarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UiProgressBarComponent>;

const Template: Story<UiProgressBarComponent> = (args: UiProgressBarComponent) => ({
  component: UiProgressBarComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}