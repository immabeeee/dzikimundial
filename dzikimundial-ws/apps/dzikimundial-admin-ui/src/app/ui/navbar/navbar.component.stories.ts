import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { NavbarComponent } from './navbar.component'
import { NavbarModule } from './navbar.module'
import { RouterTestingModule } from '@angular/router/testing'
import { TeamsBrowserPageComponent } from '../../feature/teams/feature/teams-browser/teams-browser.page'
import { ROUTER_LINK } from '../../models/route-links.model'

export default {
  title: 'NavbarComponent',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        NavbarModule,
        RouterTestingModule.withRoutes([
          { path: ROUTER_LINK.TEAMS, component: TeamsBrowserPageComponent },
          { path: ROUTER_LINK.PLAYERS, component: TeamsBrowserPageComponent },
          { path: ROUTER_LINK.TOURNAMENTS, component: TeamsBrowserPageComponent },
          { path: ROUTER_LINK.USERS, component: TeamsBrowserPageComponent },
        ]),
      ],
    }),
  ],
} as Meta<NavbarComponent>

const Template: Story<NavbarComponent> = (args: NavbarComponent) => ({
  component: NavbarComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
