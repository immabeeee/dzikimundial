import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AppRemoteComponent } from './app-remote.component';

export default {
  title: 'AppRemoteComponent',
  component: AppRemoteComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AppRemoteComponent>;

const Template: Story<AppRemoteComponent> = (args: AppRemoteComponent) => ({
  component: AppRemoteComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}