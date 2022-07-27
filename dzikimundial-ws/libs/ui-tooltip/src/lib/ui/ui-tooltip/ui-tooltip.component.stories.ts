import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiTooltipComponent } from './ui-tooltip.component'
import { UiIconButtonModule } from '@dzikimundial-ws/ui-icon-button'
import { TooltipDirective } from '../../directives/tooltip.directive'

export default {
  title: 'UiTooltipComponent',
  component: UiTooltipComponent,
  decorators: [
    moduleMetadata({
      declarations: [TooltipDirective],
      imports: [UiIconButtonModule],
      providers: [],
    }),
  ],
} as Meta<UiTooltipComponent>

const TemplateElement: Story<UiTooltipComponent> = (args: UiTooltipComponent) => ({
  props: args,
  template: `
  <dzikimundial-ws-ui-icon-button dzikimundialWsTooltip [tooltipContent]="'edit team'" [icon]="'gg-edit-markup'">
  </dzikimundial-ws-ui-icon-button>`,
})

export const Primary = TemplateElement.bind({})
Primary.args = {}
