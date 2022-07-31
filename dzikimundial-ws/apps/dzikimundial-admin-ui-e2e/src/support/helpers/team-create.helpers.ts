export const getMenuTitle = () => cy.get('[data-test-id="dm-team-create-menu-title"]')
export const getMenuBackButton = () => cy.get('[data-test-id="dm-team-create-menu-back-button"]')
export const getSectionTitle = () => cy.get('[data-test-id="dm-team-create-section-title"]')
export const getProgressBar = () => cy.get('[data-test-id="dm-team-create-progress-bar"]')

export const checkIfCreateTeamPageElementsExist = () => {
  getMenuTitle().should('be.visible')
  getMenuTitle().contains('Menu')
  getMenuBackButton().should('be.visible')
  getSectionTitle().should('be.visible')
  getSectionTitle().contains('Create new team')
}
