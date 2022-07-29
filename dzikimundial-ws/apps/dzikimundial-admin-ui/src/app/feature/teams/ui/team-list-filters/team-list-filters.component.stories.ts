import { Filter, generateDefaultListQuery, TeamName } from '@dzikimundial-ws/api-interfaces'
import { provideMockStore } from '@ngrx/store/testing'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { addDefaultWrapper } from 'apps/dzikimundial-admin-ui/.storybook/utils'
import { of } from 'rxjs'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { initialState } from '../../data-access/state/teams-state.reducer'
import { getTeamListView } from '../../data-access/state/teams-state.selectors'
import { TeamListFiltersComponent } from './team-list-filters.component'
import { TeamListFiltersModule } from './team-list-filters.module'

export default {
  title: 'TeamModule/Ui/TeamListFiltersComponent',
  component: TeamListFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamListFiltersModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getTeamListView,
              value: {
                teams: [],
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery().updateFilters([
                  new Filter('name', TeamName.ARGENTINA),
                  new Filter('description', 'lorem ipsum'),
                ]),
              },
            },
          ],
        }),
        TeamsStateFacade,
      ],
    }),
    addDefaultWrapper(),
  ],
} as Meta<TeamListFiltersComponent>

const Template: Story<TeamListFiltersComponent> = (args: TeamListFiltersComponent) => ({
  component: TeamListFiltersComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
