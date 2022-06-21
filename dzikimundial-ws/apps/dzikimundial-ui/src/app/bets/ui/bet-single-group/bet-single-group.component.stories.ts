import { moduleMetadata, Story, Meta } from '@storybook/angular'
import * as testData from './../../test/singles.test-data'
import { BetSingleGroupComponent } from './bet-single-group.component'
import { BetsSingleGroupModule } from './bet-single-group.module'

export default {
  title: 'BetSingleGroupComponent',
  component: BetSingleGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsSingleGroupModule],
    }),
  ],
} as Meta<BetSingleGroupComponent>

const Template: Story<BetSingleGroupComponent> = (args: BetSingleGroupComponent) => ({
  component: BetSingleGroupComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  groupedSingles: testData.singlesGroupedByDate[0],
}
