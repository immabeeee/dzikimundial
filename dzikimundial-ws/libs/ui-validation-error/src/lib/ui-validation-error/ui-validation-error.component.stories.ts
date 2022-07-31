import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular'
import { UiValidationErrorComponent } from './ui-validation-error.component'
import { UiInputModule } from '@dzikimundial-ws/ui-input'

export default {
  title: 'UiValidationErrorComponent',
  component: UiValidationErrorComponent,
  decorators: [
    moduleMetadata({
      imports: [UiInputModule],
    }),
    componentWrapperDecorator(
      (story) => `
    <div style="
    height: 100vh; 
    width: 100vw; 
    background-image: radial-gradient(var(--grey-100) 2px, transparent 2px), radial-gradient(var(--grey-100) 2px, transparent 2px);
    background-size: 32px 32px;
    background-position: 0 0, 16px 16px;
    background-color: var(--grey-300);
    ">
    <dzikimundial-ws-ui-input [label]="'label'" [id]="'id'"
  [type]="'text'" [placeholder]="'placeholder'">
</dzikimundial-ws-ui-input>
    ${story}
    </div>
    `,
    ),
  ],
} as Meta<UiValidationErrorComponent>

const Template: Story<UiValidationErrorComponent> = (args: UiValidationErrorComponent) => ({
  component: UiValidationErrorComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  isHidden: false,
  message: 'The field is required',
}

export const Hidden = Template.bind({})
Hidden.args = {
  isHidden: true,
  message: 'The field is required',
}
