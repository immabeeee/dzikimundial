import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiInputModule } from '../ui-input.module';
import { UiInputComponent } from './ui-input.component';

export default {
  title: 'UiInputComponent',
  component: UiInputComponent,
  decorators: [
    moduleMetadata({
      imports: [UiInputModule],
    })
  ],
} as Meta<UiInputComponent>;

const Template: Story<UiInputComponent> = (args: UiInputComponent) => ({
  component: UiInputComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  id: 'teamName',
  label: "Team",
  description: ':)',
  type: 'text'
}