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
        description: "Session for test",
        users:[],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
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
        description: "Session for test",
        users:[],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
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
    cy.contains(session.description);
    cy.contains("December 25, 2024");
    cy.contains("February 25, 2024");
    cy.contains(teacher.firstName);
    cy.contains(teacher.lastName);
  })

  it('shows session detail with delete button when admin', () => {
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
        description: "Session for test",
        users:[],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
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
        description: "Session for test",
        users:[],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
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
    cy.get('button[mat-raised-button]').get('.ml1').contains('Delete');
  })
});
