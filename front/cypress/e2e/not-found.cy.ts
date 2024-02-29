describe('Page not found spec', () => {
  it('displays not found message', () => {
    cy.visit('/404')

    cy.get('h1').contains("not found");
  })
});
