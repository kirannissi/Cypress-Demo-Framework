cy.helpers = {};

cy.helpers.countElements = (element, operator, count) => {
  let assert;
  switch (operator) {
    case '=': assert = 'have.length'; break;
    case '<': assert = 'have.length.lessThan'; break;
    case '>': assert = 'have.length.greaterThan'; break;
    case '>=': assert = 'have.length.least'; break;
    default: assert = 'have.length'; break;
  }

  cy.get(element).should('be.visible');

  // To count elements with text you can do:
  // Then I should count elements ".foo:contains('Text')" "=" 3
  cy.get(element).should(assert, count);
};