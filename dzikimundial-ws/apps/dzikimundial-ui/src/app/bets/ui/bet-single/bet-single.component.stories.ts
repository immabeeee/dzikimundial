import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { TeamName } from '../../models/bets-groups/bets-group.model'
import * as testData from './../../test/teams.test-data'
import { BetSingleComponent } from './bet-single.component'
import { BetsSingleModule } from './bet-single.module'

export default {
  title: 'BetSingleComponent',
  component: BetSingleComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsSingleModule],
    }),
  ],
} as Meta<BetSingleComponent>

const Template: Story<BetSingleComponent> = (args: BetSingleComponent) => ({
  component: BetSingleComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  single: {
    id: '1',
    homeTeam: testData.findTeam(TeamName.SENEGAL),
    awayTeam: testData.findTeam(TeamName.BELGIUM),
    date: new Date(2022, 10, 21, 20, 0, 0, 0),
  },
}
