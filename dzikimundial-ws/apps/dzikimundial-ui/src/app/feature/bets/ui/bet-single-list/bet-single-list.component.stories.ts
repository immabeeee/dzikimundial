import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { ToastrModule } from 'ngx-toastr'
import * as testData from '@dzikimundial-ws/test-utils'
import { BetSingleListComponent } from './bet-single-list.component'
import { BetsSingleListModule } from './bet-single-list.module'

export default {
  title: 'BetSingleListComponent',
  component: BetSingleListComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsSingleListModule, BrowserAnimationsModule, ToastrModule.forRoot()],
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
