export const getFilterSectionTitle = () => cy.get('[data-test-id="dm-team-list-filter-title"]')
export const getNameFilter = () => cy.get('[data-test-id="dm-team-list-filter-name-input"]')
export const getDescriptionFilter = () => cy.get('[data-test-id="dm-team-list-filter-description-input"]')
export const getTeamListSectionTitle = () => cy.get('[data-test-id="dm-team-list-title"]')
export const getCreateTeamButton = () => cy.get('[data-test-id="nav-link-create-team"]')
export const getTeamListItem = (id: string, nestedSelector?: string) =>
  cy.get(`[data-test-id="dm-team-item-team-info-${id}"]${nestedSelector ? nestedSelector : ''}`)

export const checkIfTeamListPageElementsExist = () => {
  getFilterSectionTitle().should('be.visible')
  getFilterSectionTitle().contains('Filter list')
  getNameFilter().should('be.visible')
  getDescriptionFilter().should('be.visible')
  getTeamListSectionTitle().should('be.visible')
  getTeamListSectionTitle().contains('Team list')
}
