Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data = {
      firstName: "edemilson",
      lastName: "melo",
      email: "edemilson@gmail.com",
      opentextarea: "texto",
} ) => {
  cy.get("#firstName").type(data.firstName);
  cy.get("#lastName").type(data.lastName);
  cy.get("#email").type(data.email);
  cy.get("#open-text-area").type(data.opentextarea);
  cy.get('button[type="submit"]').click()
});
