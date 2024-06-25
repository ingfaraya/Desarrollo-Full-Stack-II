import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not register with invalid form', () => {
    component.registerForm.setValue({
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: '',
      address: ''
    });
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('should register with valid form', () => {
    spyOn(authService, 'register').and.callThrough();
    component.registerForm.setValue({
      fullName: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password1',
      confirmPassword: 'Password1',
      dob: '2000-01-01',
      address: '123 Test St'
    });
    component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
  });
});
