import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular'
import { TeamItemComponent } from './team-item.component'
import * as testData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'
import { TeamItemModule } from './team-item.module'
import { provideMockStore } from '@ngrx/store/testing'
import { TeamsStateFacade } from '../../data-access/state/teams-state.facade'
import { getRemoveTeamsView } from '../../data-access/state/teams-state.selectors'
import { RouterTestingModule } from '@angular/router/testing'
import { initialState } from '../../data-access/state/teams-state.reducer'

export default {
  title: 'TeamItemComponent',
  component: TeamItemComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamItemModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getRemoveTeamsView,
              value: {
                removingTeams: [{ id: '2' }],
                removingTeamsError: [],
              },
            },
          ],
        }),
        TeamsStateFacade,
      ],
    }),
    componentWrapperDecorator((story) => `<div style="background-color: var(--grey-200)">${story}</div>`),
  ],
} as Meta<TeamItemComponent>

const Template: Story<TeamItemComponent> = (args: TeamItemComponent) => {
  return {
    component: TeamItemComponent,
    props: args,
  }
}

export const Primary = Template.bind({})
Primary.args = {
  team: {
    ...testData.findTeam(TeamName.ARGENTINA),
    id: '1',
  },
  hideMenu: false,
}

export const WithoutMenu = Template.bind({})
WithoutMenu.args = {
  team: {
    ...testData.findTeam(TeamName.ARGENTINA),
    id: '1',
  },
  hideMenu: true,
}

export const DeleteLoading = Template.bind({})
DeleteLoading.args = {
  team: {
    ...testData.findTeam(TeamName.BELGIUM),
    id: '2',
  },
  hideMenu: false,
}
