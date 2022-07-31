export const getNavbarLogo = () => cy.get('[data-test-id="nav-logo"]')
export const getNavbarTeamsLink = () => cy.get('[data-test-id="nav-link-teams"]')
export const getNavbarPlayersLink = () => cy.get('[data-test-id="nav-link-players"]')
export const getNavbarTournamentsLink = () => cy.get('[data-test-id="nav-link-tournaments"]')
export const getNavbarUsersLink = () => cy.get('[data-test-id="nav-link-users"]')
export const getNavbarMenuThemeButton = () => cy.get('[data-test-id="dm-navbar-menu-theme-button"]')
export const getNavbarMenuLogoutButton = () => cy.get('[data-test-id="dm-navbar-menu-logout-button"]')

export const checkIfNavbarElementsExist = () => {
    getNavbarLogo().should('be.visible')
    getNavbarTeamsLink().should('be.visible')
    getNavbarPlayersLink().should('be.visible')
    getNavbarTournamentsLink().should('be.visible')
    getNavbarUsersLink().should('be.visible')
    getNavbarMenuThemeButton().should('be.visible')
    getNavbarMenuLogoutButton().should('be.visible')
  }