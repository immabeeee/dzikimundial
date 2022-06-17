import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { NavbarModule } from './navbar.module';
import { RouterTestingModule } from '@angular/router/testing'
import { BETS_ROUTER_LINK } from '../../bets/models/route-links.model';
import { BetsBrowserPageComponent } from '../../bets/feature/bets-browser/bets-browser.page';

export default {
  title: 'NavbarComponent',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [NavbarModule, RouterTestingModule.withRoutes([
        { path: BETS_ROUTER_LINK.GROUPS, component: BetsBrowserPageComponent },
        { path: BETS_ROUTER_LINK.SINGLE, component: BetsBrowserPageComponent },
        { path: BETS_ROUTER_LINK.WINNERS, component: BetsBrowserPageComponent },
        { path: BETS_ROUTER_LINK.BEST, component: BetsBrowserPageComponent },
      ])],
    })
  ],
} as Meta<NavbarComponent>;

const Template: Story<NavbarComponent> = (args: NavbarComponent) => ({
  component: NavbarComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}