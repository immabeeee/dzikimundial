import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiButtonModule } from '../ui-button.module'
import { UiButtonComponent } from './ui-button.component'

export default {
  title: 'UiButtonComponent',
  component: UiButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [UiButtonModule],
    }),
  ],
} as Meta<UiButtonComponent>

const Template: Story<UiButtonComponent> = (args: UiButtonComponent) => ({
  component: UiButtonComponent,
  props: args,
})

export const PrimaryTextOnly = Template.bind({})
PrimaryTextOnly.args = {
  text: 'lorem',
}

export const PrimaryTextWithIcon = Template.bind({})
PrimaryTextWithIcon.args = {
  text: 'lorem',
  icon: 'gg-close',
}

export const PrimaryLoadingTextOnly = Template.bind({})
PrimaryLoadingTextOnly.args = {
  text: 'lorem',
  isLoading: true,
}

export const PrimaryLoadingTextWithIcon = Template.bind({})
PrimaryLoadingTextWithIcon.args = {
  text: 'lorem',
  icon: 'gg-close',
  isLoading: true,
}

export const DisabledLoadingTextWithIcon = Template.bind({})
DisabledLoadingTextWithIcon.args = {
  text: 'lorem',
  icon: 'gg-close',
  isLoading: true,
  isDisabled: true,
}

export const DisabledTextOnly = Template.bind({})
DisabledTextOnly.args = {
  text: 'lorem',
  isDisabled: true,
}
