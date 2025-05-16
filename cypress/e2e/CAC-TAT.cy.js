describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 20);

    cy.get("#firstName").type("edemilson");
    cy.get("#lastName").type("da Silva");
    cy.get("#email").type("edemilson_melo@hotmail.com");
    cy.get("#phone").type("65992498410");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("edemilson");
    cy.get("#lastName").type("da Silva");
    cy.get("#email").type("edemilson_melo@hotmail,com");
    cy.get("#open-text-area").type("teste");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });
  it(" validar que, se um valor não-numérico for digitado, seu valor continuará vazio.", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("edemilson");
    cy.get("#lastName").type("da Silva");
    cy.get("#email").type("edemilson_melo@hotmail.com");
    cy.get("#open-text-area").type("teste");
    cy.get("#phone-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("edemilson")
      .should("have.value", "edemilson")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("da Silva")
      .should("have.value", "da Silva")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("edemilson_melo@hotmail.com")
      .should("have.value", "edemilson_melo@hotmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("992498410")
      .should("have.value", "992498410")
      .clear()
      .should("have.value", "");
  });
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it.only("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
});
