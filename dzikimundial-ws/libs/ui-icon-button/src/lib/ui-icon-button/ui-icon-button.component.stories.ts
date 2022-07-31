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

export const PrimaryLoading = Template.bind({})
PrimaryLoading.args = {
  icon: 'gg-close',
  isLoading: true,
}

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
  icon: 'gg-close',
  isDisabled: true,
}

export const PrimaryDisabledAndLoading = Template.bind({})
PrimaryDisabledAndLoading.args = {
  icon: 'gg-close',
  isLoading: true,
  isDisabled: true,
}
