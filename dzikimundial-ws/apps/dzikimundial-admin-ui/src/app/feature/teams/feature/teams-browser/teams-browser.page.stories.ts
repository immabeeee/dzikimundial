import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RelativeRouterService } from './../../../../remote/services/relative-router.service'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { initialState } from '../../data-access/state/teams-state.reducer'
import { TeamsBrowserPageComponent } from './teams-browser.page'
import { TeamsBrowserPageModule } from './teams-browser.page.module'
import { getRemoveTeamsView, getTeamListView } from '../../data-access/state/teams-state.selectors'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { generateDefaultListQuery } from '@dzikimundial-ws/api-interfaces'
import { addDefaultWrapper } from './../../../../../../.storybook/utils'

export default {
  title: 'TeamsBrowserPageComponent',
  component: TeamsBrowserPageComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamsBrowserPageModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getRemoveTeamsView,
              value: { removingTeams: [{ id: '1' }, { id: '4' }], removingTeamsError: [] },
            },
            {
              selector: getTeamListView,
              value: {
                teams: teamsTestData.teams.map((e, index) => {
                  return { ...e, id: index.toString() }
                }),
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery(),
              },
            },
          ],
        }),
        TeamsStateFacade,
        RelativeRouterService,
      ],
    }),
    addDefaultWrapper(),
  ],
} as Meta<TeamsBrowserPageComponent>

const Template: Story<TeamsBrowserPageComponent> = (args: TeamsBrowserPageComponent) => ({
  component: TeamsBrowserPageComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
