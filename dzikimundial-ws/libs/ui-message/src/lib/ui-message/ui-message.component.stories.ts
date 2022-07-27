import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiMessageComponent } from './ui-message.component'

export default {
  title: 'UiMessageComponent',
  component: UiMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<UiMessageComponent>

const Template: Story<UiMessageComponent> = (args: UiMessageComponent) => ({
  component: UiMessageComponent,
  props: args,
})

export const success = Template.bind({})
success.args = {
  type: 'success',
  message: 'Lorem ipsum',
}

export const warn = Template.bind({})
warn.args = {
  type: 'warn',
  message: 'Lorem ipsum',
}

export const info = Template.bind({})
info.args = {
  type: 'info',
  message: 'Lorem ipsum',
}

export const error = Template.bind({})
error.args = {
  type: 'error',
  message: 'Lorem ipsum',
}

export const primary = Template.bind({})
error.args = {
  type: 'primary',
  message: 'Lorem ipsum',
}