import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { initialState } from '../../data-access/state/teams-state.reducer'
import { TeamCreatePageComponent } from './team-create.page'
import { TeamCreatePageModule } from './team-create.page.module'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { of } from 'rxjs'

export default {
  title: 'TeamModule/Feature/TeamCreatePageComponent',
  component: TeamCreatePageComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamCreatePageModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
        }),
        TeamsStateFacade,
      ],
    }),
  ],
} as Meta<TeamCreatePageComponent>

const Template: Story<TeamCreatePageComponent> = (args: TeamCreatePageComponent) => ({
  component: TeamCreatePageComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  createTeamView$: of({
    lastCreated: teamsTestData.findTeam(TeamName.BRAZIL),
    isLoading: false,
    error: null,
  }),
}
