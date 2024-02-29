describe('sessions', ()=>{
  it('List of sessions', ()=>{
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
            description: "Session for test"
        }]
    });

      cy.get('input[formControlName="email"]').type('yoga@studio.com');
      cy.get('input[formControlName="password"]').type('test!1234');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', 'sessions');

      cy.contains('Rentals');
  })
});
