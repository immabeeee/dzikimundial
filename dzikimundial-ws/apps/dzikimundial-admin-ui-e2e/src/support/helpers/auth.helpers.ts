export const getLogo = () => cy.get('[data-test-id="dm-logo-paragraph"]')
export const getLoginInput = () => cy.get('[data-test-id="dm-login-input"]')
export const getPasswordInput = () => cy.get('[data-test-id="dm-password-input"]')
export const getSubmitButton = () => cy.get('[data-test-id="dm-login-submit-button"]')

export const loginUser = (login: string, password: string) => {
  // should type a login
  getLoginInput().click().type(login)

  // should type a login
  getPasswordInput().click().type(password)

  // submit the auth form
  getSubmitButton().click()
}

export const checkIfAuthPageElementsExist = () => {
  getLogo().contains('dzikimundial')
  getLoginInput().should('be.visible')
  getPasswordInput().should('be.visible')
  getSubmitButton().should('be.visible')
}
