describe('session detail', () => {
  it('shows session detail', () => {
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept('GET', '/api/session', {
      body: [{
        id: 1,
        name: "Beginner test session",
        teacher_id: 1,
        description: "Session for test"
      }]
    });

    cy.intercept('GET', '/api/teacher', {
      body: [{
        id: 1,
        lastName: "Delahaye",
        firstName: "Margot"
      }]
    });

    cy.get('input[formControlName="email"]').type('yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'sessions');

    cy.contains('Rentals');

    let session = {
      id: 1,
      name: "Beginner test session",
      teacher_id: 1,
      description: "Session for test"
    };
    let teacher = {
      id: 1,
      lastName: "DELAHAYE",
      firstName: "Margot"
    };

    cy.intercept('GET', '/api/session/1', session);
    cy.intercept('GET', '/api/teacher/1', teacher);

    cy.get('button[mat-raised-button]').contains('Detail').click();

    cy.url().should('include', 'detail');
  })
});
