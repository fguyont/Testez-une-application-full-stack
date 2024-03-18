describe('sessions', ()=>{
  it('sessions list successfull', ()=>{
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
        body:[{
            id: 1,
            name: "Beginner test session",
            teacher_id: 1,
            description: "Session for beginners"
        },
        {
          id: 2,
          name: "Intermediate test session",
          teacher_id: 1,
          description: "Session for intermediates"
      }
      ]
    });

      cy.get('input[formControlName="email"]').type('yoga@studio.com');
      cy.get('input[formControlName="password"]').type('test!1234');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', 'sessions');

      cy.contains('Rentals');
      cy.contains('Beginner test session');
      cy.contains('Intermediate test session');
  })

  it('sessions list with create and detail buttons as admin', ()=>{
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
      body:[{
          id: 1,
          name: "Beginner test session",
          teacher_id: 1,
          description: "Session for beginners"
      },
      {
        id: 2,
        name: "Intermediate test session",
        teacher_id: 1,
        description: "Session for intermediates"
    }
    ]
  });

    cy.get('input[formControlName="email"]').type('yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'sessions');

    cy.get('button[mat-raised-button]').get('.ml1').contains('Detail');
    cy.get('button[mat-raised-button]').get('.ml1').contains('Create');
    cy.get('button[mat-raised-button]').get('.ml1').contains('Edit');
})
});
