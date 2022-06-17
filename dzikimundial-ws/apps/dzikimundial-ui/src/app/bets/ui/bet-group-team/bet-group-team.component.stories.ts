import { moduleMetadata, Story, Meta } from '@storybook/angular'
import * as testData from './../../test/groups.test-data'
import { BetsGroupTeamComponent } from './bet-group-team.component'
import { BetsGroupTeamModule } from './bet-group-team.module'

export default {
  title: 'BetsGroupTeamComponent',
  component: BetsGroupTeamComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsGroupTeamModule],
    }),
  ],
} as Meta<BetsGroupTeamComponent>

const Template: Story<BetsGroupTeamComponent> = (args: BetsGroupTeamComponent) => ({
  component: BetsGroupTeamComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  team: testData.groups[0].teams[0],
}
