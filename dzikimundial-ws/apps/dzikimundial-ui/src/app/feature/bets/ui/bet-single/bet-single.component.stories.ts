import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { ToastrModule } from 'ngx-toastr'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import * as testData from '@dzikimundial-ws/test-utils';
import { BetSingleComponent } from './bet-single.component'
import { BetsSingleModule } from './bet-single.module'

export default {
  title: 'BetSingleComponent',
  component: BetSingleComponent,
  decorators: [
    moduleMetadata({
      imports: [BetsSingleModule, BrowserAnimationsModule, ToastrModule.forRoot()],
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
