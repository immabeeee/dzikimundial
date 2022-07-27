import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TeamEditPageComponent } from './team-edit.page';

export default {
  title: 'TeamEditPageComponent',
  component: TeamEditPageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TeamEditPageComponent>;

const Template: Story<TeamEditPageComponent> = (args: TeamEditPageComponent) => ({
  component: TeamEditPageComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}