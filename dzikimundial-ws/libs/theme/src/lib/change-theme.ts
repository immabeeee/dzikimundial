export const primary = [
  { name: '--theme', value: 'primary' },
  { name: '--white-100', value: '#fff' },
  { name: '--grey-0', value: '#e4e4e4' },
  { name: '--grey-50', value: '#B8B8B8' },
  { name: '--grey-75', value: '#6a6a6a' },
  { name: '--grey-100', value: '#262626' },
  { name: '--grey-200', value: '#111111' },
  { name: '--grey-250', value: '#3b3b3b' },
  { name: '--grey-300', value: '#080808' },
  { name: '--grey-400', value: '#1B1E21' },
  { name: '--black-100', value: '#000000' },
  { name: '--blue-100', value: '#00C8C8' },
  { name: '--blue-200', value: '#009494' },
  { name: '--blue-300', value: '#0031a0' },
  { name: '--blue-500', value: '#001035' },
  { name: '--green-100', value: '#13a953' },
  { name: '--red-100', value: '#c84900' },
  { name: '--brown-100', value: '#1a1a1a' },
  { name: '--error-100:', value: '#7a0000' },
  { name: '--error-200', value: '#953535' },
  { name: '--warn-100', value: '#c57e07' },
  { name: '--warn-200', value: '#a96c06' },
  { name: '--info-100', value: '#01addb' },
  { name: '--info-200', value: '#007a9b' },
  { name: '--success-100', value: '#01db72' },
  { name: '--success-200', value: '#00ab58' },
]
const secondary = [
  { name: '--theme', value: 'secondary' },
  { name: '--white-100', value: '#000' }, //
  { name: '--grey-0', value: '#e4e4e4' },
  { name: '--grey-50', value: '#5c5c5c' },
  { name: '--grey-75', value: '#6a6a6a' },
  { name: '--grey-100', value: '#dbdbdb' }, //
  { name: '--grey-200', value: '#f7f7f7' }, //
  { name: '--grey-250', value: '#dbdbdb' }, //
  { name: '--grey-300', value: '#ebebeb' }, //
  { name: '--grey-400', value: '#1B1E21' },
  { name: '--black-100', value: '#fff' },
  { name: '--blue-100', value: '#b6deff' },
  { name: '--blue-200', value: '#009494' },
  { name: '--blue-300', value: '#0031a0' },
  { name: '--blue-500', value: '#9aaed8' },
  { name: '--green-100', value: '#13a953' },
  { name: '--red-100', value: '#c84900' },
  { name: '--brown-100', value: '#ffffff' },
  { name: '--error-100:', value: '#fbdbdb' },
  { name: '--error-200', value: '#f9c8c8' },
  { name: '--warn-100', value: '#fbecdb' },
  { name: '--warn-200', value: '#f9f3c8' },
  { name: '--info-100', value: '#dbe7fb' },
  { name: '--info-200', value: '#c8eaf9' },
  { name: '--success-100', value: '#dbfbe3' },
  { name: '--success-200', value: '#c8f9ce' },
]

export function getCurrentTheme(): 'primary' | 'secondary' {
  return document.documentElement.style.getPropertyValue('--theme') as 'primary' | 'secondary'
}

export function changeTheme(): void {
  const theme = getCurrentTheme()

  if (theme === 'primary') {
    secondary.forEach(({ name, value }) => {
      document.documentElement.style.setProperty(name, value)
    })
  } else {
    primary.forEach(({ name, value }) => {
      document.documentElement.style.setProperty(name, value)
    })
  }
}
