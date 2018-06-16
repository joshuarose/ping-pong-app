// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
	cy.server();
	cy.route('POST', 'https://players-api.developer.alchemy.codes/api/login', 'fixture:login.json');
	cy.route('GET', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:getPlayers.json');
	cy.visit('/login');
	cy.get('#email').type('billybob@example.com');
	cy.get('#password').type('abc123');
	cy.get('#login').click();
});
