import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { BetsGroupComponent } from './bet-group.component'
import { BetsGroupModule } from './bet-group.module'
import * as testData from './../../test/groups.test-data'

export default {
  title: 'BetsGroupComponent',
  component: BetsGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsGroupModule],
    }),
  ],
} as Meta<BetsGroupComponent>

const Template: Story<BetsGroupComponent> = (args: BetsGroupComponent) => ({
  component: BetsGroupComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  group: testData.groups[0]
}
