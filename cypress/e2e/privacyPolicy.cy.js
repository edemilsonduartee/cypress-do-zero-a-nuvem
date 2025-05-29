  it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'Política de Privacidade')
    cy.contains('p','Talking About Testing')
      .should('be.visible')
  })