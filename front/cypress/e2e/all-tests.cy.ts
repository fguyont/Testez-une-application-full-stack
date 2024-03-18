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

  it('Login failed with bad credentials', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"badtest!1234"}{enter}{enter}`)

    cy.get('form > p').contains("error")
  })

  it('Login failed with empty inputs', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 400
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type(`${""}{enter}`)
    cy.get('input[formControlName=password]').type(`${""}{enter}{enter}`)

    cy.get('form > p').contains("error")
  })

  it('Logout successfull', () => {
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

    cy.contains('Logout').click();

    cy.url().should('include', '/');

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

describe('Page not found spec', () => {
  it('displays not found message', () => {
    cy.visit('/404')

    cy.get('h1').contains("not found");
  })
});


