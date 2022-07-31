import * as authHelpers from '../support/helpers/auth.helpers'
import * as navbarHelpers from '../support/helpers/navbar.helpers'
import * as teamsPageHelpers from '../support/helpers/teams.helpers'
import * as teamCreatePageHelpers from '../support/helpers/team-create.helpers'
import * as teamFormHelpers from '../support/helpers/team-form.helpers'
import { faker } from '@faker-js/faker'

describe('Teams Management', () => {
  const teamName: string = faker.company.companyName()
  let teamId!: string

  beforeEach(() => cy.visit('/'))

  it('should display auth page', () => {
    authHelpers.checkIfAuthPageElementsExist()
  })

  it('should display teams page after login admin', () => {
    // login admin user
    authHelpers.loginUser('kordi', 'password')
    navbarHelpers.checkIfNavbarElementsExist()
    teamsPageHelpers.checkIfTeamListPageElementsExist()
  })

  it('should create a new team', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3000/api/team',
    }).as('createTeam')

    authHelpers.loginUser('kordi', 'password')
    teamsPageHelpers.getCreateTeamButton().click()
    teamCreatePageHelpers.checkIfCreateTeamPageElementsExist()
    teamFormHelpers.checkIfTeamFromElementsExist()
    // try to submit empty form
    teamFormHelpers.checkSubmittedEmptyForm()
    // try to submit valid form
    teamFormHelpers.checkSubmittedFilledForm(teamName)

    cy.wait('@createTeam')
      .its('response.body')
      .then(({ id }) => {
        teamId = id
        // check if the added team already exists in team list
        teamsPageHelpers.checkIfTeamListPageElementsExist()
        teamsPageHelpers.getNameFilter().click().type(teamName)
        teamsPageHelpers.getTeamListItem(id).should('be.visible')
      })
  })

  it('should update recently created team', () => {
    cy.intercept({
      method: 'PUT',
      url: `http://localhost:3000/api/team/${teamId}`,
    }).as('updateTeam')

    authHelpers.loginUser('kordi', 'password')
    teamsPageHelpers.checkIfTeamListPageElementsExist()
    teamsPageHelpers.getNameFilter().click().type(teamName)
    teamsPageHelpers.getTeamListItem(teamId).should('be.visible')
    teamsPageHelpers.getTeamListItem(teamId, '> .menu-container > dzikimundial-ws-ui-icon-button').first().click()
    // try to submit valid form
    teamFormHelpers.checkSubmittedFilledForm(`${teamName}_updated`)

    cy.wait('@updateTeam')
      .its('response.body')
      .then(({ id }) => {
        // check if the added team already exists in team list
        teamsPageHelpers.checkIfTeamListPageElementsExist()
        teamsPageHelpers.getNameFilter().click().type(`${teamName}_updated`)
        teamsPageHelpers.getTeamListItem(id).should('be.visible')
      })
  })

  it('should remove recently created team', () => {
    cy.intercept({
      method: 'DELETE',
      url: `http://localhost:3000/api/team/${teamId}`,
    }).as('deleteTeam')

    authHelpers.loginUser('kordi', 'password')
    teamsPageHelpers.checkIfTeamListPageElementsExist()
    teamsPageHelpers.getNameFilter().click().type(`${teamName}_updated`)
    teamsPageHelpers.getTeamListItem(teamId).should('be.visible')
    teamsPageHelpers.getTeamListItem(teamId, '> .menu-container > dzikimundial-ws-ui-icon-button').eq(1).click()

    cy.wait('@deleteTeam')
      .its('response.body')
      .then(() => {
        // check if the added team already exists in team list
        teamsPageHelpers.checkIfTeamListPageElementsExist()
        teamsPageHelpers.getNameFilter().click().type(`${teamName}_updated`)
        teamsPageHelpers.getTeamListItem(teamId).should('not.exist')
      })
  })
})
