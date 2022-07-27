import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TeamCreatePageComponent } from './team-create.page';

export default {
  title: 'TeamCreatePageComponent',
  component: TeamCreatePageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TeamCreatePageComponent>;

const Template: Story<TeamCreatePageComponent> = (args: TeamCreatePageComponent) => ({
  component: TeamCreatePageComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}