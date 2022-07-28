import { componentWrapperDecorator } from '@storybook/angular'

export function addDefaultWrapper() {
  return componentWrapperDecorator(
    (story) => `
  <div style="
  height: 100vh; 
  width: 100vw; 
  background-image: radial-gradient(var(--grey-100) 2px, transparent 2px), radial-gradient(var(--grey-100) 2px, transparent 2px);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
  background-color: var(--grey-300);
  ">${story}</div>
  `,
  )
}
