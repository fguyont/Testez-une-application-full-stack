describe('Me', () => {
  it('User information if admin', () => {
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

    cy.get('input[formControlName="email"]').type('admin-yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();


    let user = {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin-yoga@studio.com",
      admin: true
    };
    cy.intercept('GET', '/api/user/1', user);
    cy.contains('Account').click();
    cy.contains(user.firstName);
    cy.contains(user.lastName.toLocaleUpperCase());
    cy.contains(user.email);
    cy.contains('admin');
  });

  it('User information if not admin', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 2,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false
      },
    })

    cy.get('input[formControlName="email"]').type('notadmin@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();


    let user = {
      firstName: "Notadmin",
      lastName: "Notadmin",
      email: "notadmin@studio.com",
      admin: false
    };
    cy.intercept('GET', '/api/user/2', user);
    cy.contains('Account').click();
    cy.contains(user.firstName);
    cy.contains(user.lastName.toLocaleUpperCase());
    cy.contains(user.email);
    cy.contains('Delete');

  });
});
