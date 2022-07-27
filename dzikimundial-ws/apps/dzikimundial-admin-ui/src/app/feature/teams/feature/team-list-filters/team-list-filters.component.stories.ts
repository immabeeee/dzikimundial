import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TeamListFiltersComponent } from './team-list-filters.component';

export default {
  title: 'TeamListFiltersComponent',
  component: TeamListFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TeamListFiltersComponent>;

const Template: Story<TeamListFiltersComponent> = (args: TeamListFiltersComponent) => ({
  component: TeamListFiltersComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}