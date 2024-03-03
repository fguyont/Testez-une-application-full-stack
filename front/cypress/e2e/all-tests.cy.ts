describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })
});

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
});

describe('Page not found spec', () => {
  it('displays not found message', () => {
    cy.visit('/404')

    cy.get('h1').contains("not found");
  })
});

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

describe('session form', () => {
  it('shows session creation form', () => {
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

    cy.get('input[formControlName="email"]').type('yoga@studio.com');
    cy.get('input[formControlName="password"]').type('test!1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'sessions');

    cy.contains('Rentals');

    cy.get('button[mat-raised-button]').contains('Create').click();
  })
});

