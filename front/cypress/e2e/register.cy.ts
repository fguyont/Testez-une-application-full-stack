describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200
    })

    cy.get('input[formControlName=firstName]').type("Serious")
    cy.get('input[formControlName=lastName]').type("Lee")
    cy.get('input[formControlName=email]').type("serious-lee@mail.com")
    cy.get('input[formControlName=password]').type(`${"lee!1234"}{enter}{enter}`)

    cy.url().should('include', '/login')
  })

  it('Register failed with an invalid password with one character and error message appeared', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400
    })

    cy.get('input[formControlName=firstName]').type("Serious")
    cy.get('input[formControlName=lastName]').type("Lee")
    cy.get('input[formControlName=email]').type("serious-lee@mail.com")
    cy.get('input[formControlName=password]').type(`${"l"}{enter}{enter}`)

    cy.get('form > span').contains("error")
  })

  it('Register failed with an invalid password with one character and error message appeared', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400
    })

    cy.get('input[formControlName=firstName]').type(`${""}{enter}`)
    cy.get('input[formControlName=lastName]').type(`${""}{enter}`)
    cy.get('input[formControlName=email]').type(`${""}{enter}`)
    cy.get('input[formControlName=password]').type(`${""}{enter}{enter}`)

    cy.get('form > span').contains("error")
  })
});
