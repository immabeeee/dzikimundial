import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { initialState } from '../../data-access/state/teams-state.reducer'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { of } from 'rxjs'
import { TeamEditPageComponent } from './team-edit.page'
import { TeamEditPageModule } from './team-edit.page.module'
import { TeamName } from '@dzikimundial-ws/api-interfaces'

export default {
  title: 'TeamModule/Feature/TeamEditPageComponent',
  component: TeamEditPageComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamEditPageModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
        }),
        TeamsStateFacade,
      ],
    }),
  ],
} as Meta<TeamEditPageComponent>

const Template: Story<TeamEditPageComponent> = (args: TeamEditPageComponent) => ({
  component: TeamEditPageComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  routeParams$: of({
    params: {
      id: '1',
    },
  }),
  teamView$: of({
    team: teamsTestData.findTeam(TeamName.ARGENTINA),
    error: null,
    isLoading: false,
  }),
  updateTeamView$: of({
    error: null,
    isLoading: false,
  }),
}
