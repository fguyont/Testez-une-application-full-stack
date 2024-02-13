import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { User } from 'src/app/interfaces/user.interface';
import { expect } from '@jest/globals';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let user: User;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn()
  }

  const mockUserService = {
    getById: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService }],
    })
      .compileComponents();

    user = {
      id: 1, email: 'yoga@studio.com', firstName: 'Admin', lastName: 'Admin', admin: true, password: 'password', createdAt: new Date(), updatedAt: new Date(),
    }
    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set component user attribute value with session user value on component init', () => {
    let userServiceSpy = jest.spyOn(mockUserService, 'getById').mockReturnValue(of(user));
    fixture.detectChanges();
    expect(component.user?.id).toBe(user.id);
  });

  it('should call delete from UserService then call logOut from SessionService', () => {
    let userServiceSpy = jest.spyOn(mockUserService, 'delete').mockReturnValue(of(void 0));
    let sessionServiceSpy = jest.spyOn(mockSessionService, 'logOut');
    component.delete();
    expect(userServiceSpy).toBeCalled();
  });
});
