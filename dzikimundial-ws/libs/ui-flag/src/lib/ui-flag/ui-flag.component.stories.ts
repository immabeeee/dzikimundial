import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiFlagComponent } from './ui-flag.component';

export default {
  title: 'UiFlagComponent',
  component: UiFlagComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UiFlagComponent>;

const Template: Story<UiFlagComponent> = (args: UiFlagComponent) => ({
  component: UiFlagComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  url: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/33px-Flag_of_France.svg.png',
  description: 'France'
}