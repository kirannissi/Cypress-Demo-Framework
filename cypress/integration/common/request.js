import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I visit the {string} url', (url) => {
  cy.visit(url);
});

Given('I visit the {string} url with geolocation allowed', (url) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (resolve) => {
        resolve({
          // Antarctica
          coords: {
            latitude: -90,
            longitude: 0,
          },
        });
      });
    },
  });
});

Given('I visit the {string} url with geolocation blocked', (url) => {
  cy.visit(url, {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (resolve, reject) => {
        reject({
          code: 1,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
        });
      });
    },
  });
});

/**
 * Needs to proceed the initial pageload.
 */
Given('I disable ckeditor', () => {
  cy.intercept({
    method: 'GET',
    pathname: '**/ckeditor.js*',
  }, {
    // If you can work out how to include this from the fixtures file; all credit to you.
    body: 'CKEDITOR = {\n' +
      '  on: () => {},\n' +
      '  config: {},\n' +
      '  skin: {\n' +
      '    getPath: () => {\n' +
      '      return \'\';\n' +
      '    }\n' +
      '  },\n' +
      '  plugins: {\n' +
      '    add: () => {},\n' +
      '    addExternal: () => {}\n' +
      '  },\n' +
      '  replace: () => {},\n' +
      '  dom: {\n' +
      '    element: {\n' +
      '      get: () => {\n' +
      '        return {\n' +
      '          getEditor: () => {}\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  }\n' +
      '}',
    statusCode: 200,
  });

  cy.intercept({
    method: 'GET',
    pathname: '**/cke_plugin.entry.js',
  }, {
    body: '// CKEditor not currently supported in Cypress',
    statusCode: 200,
  });
});

const home = '/';
Given('I visit the Home page', () => {
  cy.visit(home);
});

const search = '/search';
Given('I visit the Search page', () => {
  cy.visit(search);
});

const archived = '/visiting-and-exploring-nsw/nsw-events/caboriginal';
Given('I visit an archived page', () => {
  cy.visit(archived, { failOnStatusCode: false });
});

Given('I login using {string}', (user) => {
  cy.visit('/user/login');
  cy.get('#edit-name').type(user);
  cy.get('#edit-pass').type(user);
  cy.get('#edit-submit').click();
});

Given('Drupal Views ajax requests', () => {
  cy.intercept('POST', '/views/ajax?*').as('drupalViewsAjax');
});

Given('Drupal Webform ajax requests', () => {
  cy.intercept('POST', '/node/[0-9]*?ajax_form=1&_wrapper_format=drupal_ajax').as('drupalWebformAjax');
});

Given('Youtube requests', () => {
  cy.intercept('https://googleads.g.doubleclick.net/**', {
    body: '',
  });

  cy.intercept('https://jnn-pa.googleapis.com/$rpc/google.internal.waa.v1.Waa/**', {
    body: '',
  });

  cy.intercept('POST', 'https://www.youtube.com/**', {
    body: '',
  });
});

Given('RMS postcode requests', () => {
  cy.intercept('/api/rms/postcode/autocomplete/search*').as('RMSpostcodeRequest');
});

Then('wait for request {string} to finish', (alias) => {
  cy.wait(alias);
});

Then('I should see {string} in url', (needle) => {
  cy.url().should('include', needle);
});

Then('I should see url path is {string}', (path) => {
  if (path[0] === '/') {
    cy.url().should('eq', Cypress.config().baseUrl + path);
  }
  else {
    cy.url().should('eq', path);
  }
});

Then('I should not see {string} in url', (needle) => {
  cy.url().should('not.include', needle);
});

Then('I start creating a {string} node with subtype of {string}', (bundle, subtype) => {
  cy.visit(`/node/add/${bundle}?subtype=${subtype}`);
});

Then('I should see the dataLayer matches {string}', (fixtureName) => {
  cy.window().then((win) => {
    cy.fixture(fixtureName).then((fixture) => {
      const filtered = win.dataLayer.filter((data) => {
        // These props might change depending on build.
        // The fixture data must have these empty as well.
        data.entityId = '';
        data.created = '';
        data.entityCreated = '';
        data.entityUuid = '';
        data.uuid = '';
        data['gtm.uniqueEventId'] = '';
        return JSON.stringify(data) === JSON.stringify(fixture);
      });

      expect(filtered).to.have.length(1);
    });
  });
});

Then('wait for Youtube player to load', () => {
  cy.get('.nsw-media__thumbnail.dcs-media--loaded').should('be.visible');
});