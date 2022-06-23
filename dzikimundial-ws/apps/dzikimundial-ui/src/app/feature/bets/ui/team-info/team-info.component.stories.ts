import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { TeamName } from '../../models/bets-groups/bets-group.model'
import * as testData from '../../test/teams.test-data'
import { TeamInfoComponent } from './team-info.component'
import { TeamInfoModule } from './team-info.module'

export default {
  title: 'TeamInfoComponent',
  component: TeamInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamInfoModule],
    }),
  ],
} as Meta<TeamInfoComponent>

const Template: Story<TeamInfoComponent> = (args: TeamInfoComponent) => ({
  component: TeamInfoComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  team: testData.findTeam(TeamName.GERMANY),
}

export const PrimaryReversed = Template.bind({})
PrimaryReversed.args = {
  team: testData.findTeam(TeamName.AUSTRALIA),
  isReversed: true,
}
