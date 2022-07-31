import { faker } from '@faker-js/faker'

export const getForm = () => cy.get('[data-test-id="dm-team-create-form"]')
export const getFormNameInput = () => cy.get('[data-test-id="dm-team-form-name-input"]')
export const getFormDescriptionInput = () => cy.get('[data-test-id="dm-team-form-description-input"]')
export const getFormLogoUrlInput = () => cy.get('[data-test-id="dm-team-form-logo-url-input"]')
export const getFormSubmitButton = () => cy.get('[data-test-id="dm-team-form-submit-button"]')

export const checkIfTeamFromElementsExist = () => {
  getForm().should('be.visible')
  getFormNameInput().should('be.visible')
  getFormDescriptionInput().should('be.visible')
  getFormLogoUrlInput().should('be.visible')
  getFormSubmitButton().should('be.visible')
}

export const fillEmptyForm = () => {
  getFormNameInput().click().clear().invoke('val', '')
  getFormDescriptionInput().click().clear().invoke('val', '')
  getFormLogoUrlInput().click().clear().invoke('val', '')
}

export const fillValidForm = (name?: string, description?: string, image?: string) => {
  getFormNameInput()
    .click()
    .clear()
    .type(name ? name : faker.company.companyName())
  getFormDescriptionInput()
    .click()
    .clear()
    .type(description ? description : faker.lorem.sentence())
  getFormLogoUrlInput()
    .click()
    .clear()
    .type(image ? image : faker.image.imageUrl(1234, 2345, 'team', true))
}

export const checkSubmittedEmptyForm = () => {
  fillEmptyForm()
  getFormSubmitButton().click()
  getFormNameInput().should('have.class', 'ng-invalid')
  getFormDescriptionInput().should('have.class', 'ng-invalid')
  getFormLogoUrlInput().should('have.class', 'ng-invalid')
}

export const checkSubmittedFilledForm = (teamName?: string, description?: string, image?: string) => {
  fillValidForm(teamName, description, image)
  getFormNameInput().should('not.have.class', 'ng-invalid')
  getFormDescriptionInput().should('not.have.class', 'ng-invalid')
  getFormLogoUrlInput().should('not.have.class', 'ng-invalid')
  getFormSubmitButton().click()
}
