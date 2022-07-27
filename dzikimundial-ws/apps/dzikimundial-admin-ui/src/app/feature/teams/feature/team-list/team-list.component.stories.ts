import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular'
import { provideMockStore } from '@ngrx/store/testing'
import { initialState } from '../../data-access/state/teams-state.reducer'
import { TeamListModule } from './team-list.module'
import { TeamListComponent } from './team-list.component'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { teams } from '@dzikimundial-ws/test-utils'
import { generateDefaultListQuery } from '@dzikimundial-ws/api-interfaces'
import { of } from 'rxjs'

export default {
  title: 'TeamListComponent',
  component: TeamListComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamListModule],
      providers: [
        provideMockStore({
          initialState,
        }),
        TeamsStateFacade,
      ],
    }),
    componentWrapperDecorator((story) => `<div style="background-color: var(--grey-200)">${story}</div>`),
  ],
} as Meta<TeamListComponent>

const Template: Story<TeamListComponent> = (args: TeamListComponent) => {
  return {
    component: TeamListComponent,
    props: args,
  }
}

export const loadedList = Template.bind({})
loadedList.args = {
  teamsView$: of({
    teams: teams,
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
}

export const emptyList = Template.bind({})
emptyList.args = {
  teamsView$: of({
    teams: [],
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
}

export const loadingList = Template.bind({})
loadingList.args = {
  teamsView$: of({
    teams: null,
    isLoading: true,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
}

export const error = Template.bind({})
error.args = {
  teamsView$: of({
    teams: null,
    isLoading: false,
    error: 'error',
    listQuery: generateDefaultListQuery(),
  }),
}
