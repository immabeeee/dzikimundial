import { moduleMetadata, Story, Meta } from '@storybook/angular';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { addDefaultWrapper } from 'apps/dzikimundial-admin-ui/.storybook/utils';
import { TeamListFiltersComponent } from './team-list-filters.component';

export default {
  title: 'TeamListFiltersComponent',
  component: TeamListFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    addDefaultWrapper(),
  ],
} as Meta<TeamListFiltersComponent>;

const Template: Story<TeamListFiltersComponent> = (args: TeamListFiltersComponent) => ({
  component: TeamListFiltersComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}