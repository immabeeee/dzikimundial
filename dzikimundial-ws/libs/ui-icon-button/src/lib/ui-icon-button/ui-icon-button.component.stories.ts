import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiIconButtonComponent } from './ui-icon-button.component'

export default {
  title: 'UiIconButtonComponent',
  component: UiIconButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<UiIconButtonComponent>

const Template: Story<UiIconButtonComponent> = (args: UiIconButtonComponent) => ({
  component: UiIconButtonComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  icon: 'gg-close',
}
