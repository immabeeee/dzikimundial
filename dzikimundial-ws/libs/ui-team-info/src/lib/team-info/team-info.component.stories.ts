import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiTeamInfoModule } from '../ui-team-info.module'
import { UiTeamInfoComponent } from './team-info.component'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import * as testData from '@dzikimundial-ws/test-utils';

export default {
  title: 'TeamInfoComponent',
  component: UiTeamInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [UiTeamInfoModule],
    }),
  ],
} as Meta<UiTeamInfoComponent>

const Template: Story<UiTeamInfoComponent> = (args: UiTeamInfoComponent) => ({
  component: UiTeamInfoComponent,
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
