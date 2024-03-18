describe('session form', () => {
  it('create new session', () => {
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
        users: [],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
      }]
    });

    cy.get('input[formControlName="email"]').type('yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'sessions');

    cy.contains('Rentals');

    let teachers = [{
      id: 1,
      lastName: "DELAHAYE",
      firstName: "Margot"
    },
    {
      id: 2,
      lastName: "THIERCELIN",
      firstName: "Hélène"
    }];

    cy.intercept('GET', '/api/teacher', teachers);

    cy.get('button[mat-raised-button]').contains('Create').click();

    cy.intercept('GET', '/api/session', {
      body: [{
        id: 1,
        name: "Beginner test session",
        teacher_id: 1,
        description: "Session for test",
        users: [],
        date: "2024-12-25T00:00:00",
        createdAt: "2024-02-25T00:00:00"
      },
      {
        id: 2,
        name: "New session for experts",
        teacher_id: 2,
        description: 'New session for experts not noobs !',
        users: [],
        date: "2024-12-21T00:00:00",
        createdAt: "2024-02-25T00:00:00"
      }
    ]
    });

    cy.intercept('POST', '/api/session', {
      statusCode: 200
    })

    cy.get('input[formControlName=name]').type("New session for experts")
    cy.get('input[formControlName="date"]').type('2024-12-21');
    cy.get('mat-select[formControlName="teacher_id"]').click().get('mat-option').contains('THIERCELIN').click();
    cy.get('textarea[formControlName="description"]').type('New session for experts not noobs !');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/sessions');

  });

});
