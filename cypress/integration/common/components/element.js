import { Then, When, Given } from 'cypress-cucumber-preprocessor/steps';
//import moment from 'moment';

Given('all links open in the same window', () => {
  cy.get('a').invoke('removeAttr', 'target');
});

When('I click {string}', (element) => {
  cy.get(element).click();
});

When('I click {string} with text {string}', (element, text) => {
  cy.get(element).contains(text).click();
});

When('I scroll page to element {string}', (element) => {
  cy.get(element).scrollIntoView();
});

When('I hover over element {string}', (element) => {
  cy.get(element).trigger('mouseover');
});

Then('I should see element {string}', (element) => {
  cy.get(element).should('be.visible');
});

Then('I should not see element {string}', (element) => {
  cy.get(element).should('not.be.visible');
});

Then('I should see element {string} with text {string}', (element, title) => {
  cy.get(element).should('contain', title);
});

Then('I should see element {string} with text matching {string}', (element, regex) => {
  const r = new RegExp(`${regex}`, 'g');
  cy.get(element).contains(r);
});

Then('I should see element {string} without text {string}', (element, title) => {
  cy.get(element).should('not.contain', title);
});

Then('I should see all elements {string} with text {string}', (element, text) => {
  cy.get(element).each((item) => {
    cy.wrap(item).should('contain', text);
  });
});

Then('I should see element {string} with link {string}', (element, link) => {
  cy.get(element).should('have.attr', 'href').and('include', link);
});

Then('I should see element {string} with {string} attribute {string}', (element, attribute, value) => {
  cy.get(element).should('be.visible').should('have.attr', attribute, value);
});

Then('The element {string} should not exist', (element) => {
  cy.get(element).should('not.exist');
});

Then('The element {string} should be empty', (element) => {
  cy.get(element).should('be.empty');
});

Then('I should count element(s) {string} {string} {int}', (element, operator, count) => {
  cy.helpers.countElements(element, operator, count);
});

// Then('I should see {string} dates in descending order', (element) => {
//   let dateListCopy = [];
//   const dateListOriginal = [];
//   cy.get(element).each(($el) => {
//     const formattedDate = moment($el.text()).format('YYYY-MM-DD');
//     const date = new Date(formattedDate);
//     dateListOriginal.push(date);
//   });
//   dateListCopy = dateListOriginal.slice();
//   dateListCopy.sort((a, b) => b - a);
//   expect(dateListOriginal, 'Items are sorted in descending order').to.deep.equal(dateListCopy);
// });

Then('I navigate to previous page', () => {
  cy.go('back');
});

Then('html content of element {string} matches fixture {string}', (element, fixture) => {
  cy.fixture(fixture).then((fixtureContent) => {
    cy.get(element).then((el) => {
      expect(el.html().trim()).to.equal(fixtureContent.trim());
    });
  });
});

Then('wait for mudbath page to load', () => {
  cy.wait(3000);
  cy.get('img').should('be.visible');
});