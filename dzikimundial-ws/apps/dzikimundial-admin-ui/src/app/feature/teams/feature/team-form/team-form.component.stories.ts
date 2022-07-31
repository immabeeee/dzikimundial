import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { addDefaultWrapper } from './../../../../../../.storybook/utils'
import { TeamFormModule } from './team-form.module'
import { TeamFormComponent } from './team-form.component'
import * as teamsTestData from '@dzikimundial-ws/test-utils'
import { TeamName } from '@dzikimundial-ws/api-interfaces'

export default {
  title: 'TeamModule/Feature/TeamFormComponent',
  component: TeamFormComponent,
  decorators: [
    moduleMetadata({
      imports: [TeamFormModule],
      providers: [],
    }),
    addDefaultWrapper(),
  ],
} as Meta<TeamFormComponent>

const Template: Story<TeamFormComponent> = (args: TeamFormComponent) => ({
  component: TeamFormComponent,
  props: args,
})

export const CreateTeamFrom = Template.bind({})
CreateTeamFrom.args = {
  isEditMode: false,
  isLoading: false,
  isDisabled: false,
  team: null,
}

export const CreateTeamFromDisabled = Template.bind({})
CreateTeamFrom.args = {
  isEditMode: false,
  isLoading: false,
  isDisabled: true,
  team: null,
}

export const CreateTeamFromLoading = Template.bind({})
CreateTeamFromLoading.args = {
  isEditMode: false,
  isLoading: true,
  isDisabled: false,
  team: null,
}

export const EditTeamFrom = Template.bind({})
EditTeamFrom.args = {
  isEditMode: true,
  isLoading: false,
  isDisabled: false,
  team: null,
}

export const EditTeamFromWithProvidedTeam = Template.bind({})
EditTeamFromWithProvidedTeam.args = {
  isEditMode: true,
  isLoading: false,
  isDisabled: false,
  team: teamsTestData.findTeam(TeamName.ARGENTINA),
}

export const EditTeamFromDisabled = Template.bind({})
EditTeamFromDisabled.args = {
  isEditMode: true,
  isLoading: false,
  isDisabled: true,
  team: null,
}
