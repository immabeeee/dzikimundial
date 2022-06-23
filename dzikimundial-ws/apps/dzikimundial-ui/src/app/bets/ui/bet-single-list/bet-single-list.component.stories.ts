import { moduleMetadata, Story, Meta } from '@storybook/angular'
import * as testData from './../../test/singles.test-data'
import { BetSingleListComponent } from './bet-single-list.component'
import { BetsSingleListModule } from './bet-single-list.module'

export default {
  title: 'BetSingleListComponent',
  component: BetSingleListComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsSingleListModule],
    }),
  ],
} as Meta<BetSingleListComponent>

const Template: Story<BetSingleListComponent> = (args: BetSingleListComponent) => ({
  component: BetSingleListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  singlesGroupedByDate: testData.singlesGroupedByDate,
}
