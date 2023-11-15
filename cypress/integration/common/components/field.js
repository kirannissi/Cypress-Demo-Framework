import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I type {string} in field {string}', (text, element) => {
  cy.get(element).type(text);
});

When('I click on label for field element {string}', (fieldId) => {
  // The click positioning is needed so that it doesn't click
  // a link which is inside the label.
  // This assumes a link is not the first text of a label.
  cy.get(`label[for="${fieldId}"]`).should('be.visible').click(1, 1);
});

When('I select {string} from select element {string}', (value, element) => {
  cy.get(element).select(value);
});

When('I select first item from select element {string}', (element) => {
  cy.get(`select${element}`).select(1);
});

Then('I should see input {string} with value {string}', (element, value) => {
  cy.get(element).should('have.value', value);
});

Then('I should see label {string}', (label) => {
  cy.get('label').contains(new RegExp(`^${label}$`)).should('be.visible');
});

Then('I should see checkbox {string} is checked', (element) => {
  cy.get(element).should('be.checked');
});

Then('I should see checkbox {string} is unchecked', (element) => {
  cy.get(element).should('not.be.checked');
});