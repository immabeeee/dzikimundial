import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { BetGroupListComponent } from './bet-group-list.component'
import { BetsGroupListModule } from './bet-group-list.module'
import * as testData from '@dzikimundial-ws/test-utils'

export default {
  title: 'BetGroupListComponent',
  component: BetGroupListComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsGroupListModule],
    }),
  ],
} as Meta<BetGroupListComponent>

const Template: Story<BetGroupListComponent> = (args: BetGroupListComponent) => ({
  component: BetGroupListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
groups: testData.groups
}
