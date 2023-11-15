import { When, Then } from 'cypress-cucumber-preprocessor/steps';

Then('finder is visible', () => {
  cy.get(`.finder`).should('be.visible');
});

When('I apply filters', () => {
  cy.get(`[data-test="finder-submit"]`).click();
  cy.get('.nsw-search-results').should('be.visible');
});

When('I clear all filters', () => {
  cy.get(`[data-test="finder-clear-all"]`).click();
  cy.get('.nsw-search-results').should('be.visible');
});

When('I clear all filters', () => {
  cy.get(`[data-test="finder-clear-all"]`).click();
});

When('I click Use my current location', () => {
  cy.get(`.finder .field-location-text-button`).click();
});

When('I click clear all for field {string}', (filterId) => {
  cy.get(`.clear-field-button[data-for="${filterId}"]`).click();
});

Then('pill {string} is set to {string}', (pillId, text) => {
  cy.get(`.pill[aria-controls="${pillId}"] .pill__text`).should('have.text', text);
});

Then('I click pill {string}', (pillId) => {
  cy.get(`.pill[aria-controls="${pillId}"]`).click();
});