import {Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service/auth.service';
import {StorageService} from "../services/storage.service";
import {SnackbarService} from "../../shared/snackbar-service/snackbar.service";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../interface/login.response";
import {createPasswordStrengthValidator} from "../password-strength.validator";
import {ValidationService} from "../services/not-match-validation/validation.service";
import {MatTabGroup} from "@angular/material/tabs";
import {NotificationService} from "../../core/services/notification/notification.service";

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  @ViewChild('elRef') comp: ElementRef;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;


  @Input('mat-stretch-tabs')
  stretchTabs: boolean


  showPassword: boolean = false;


  loginForm = this.fb.group({
    email: ['moe_zaky@gmail.com', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['Mm123456#', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ]]
  });
  signUpForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        createPasswordStrengthValidator()
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])],
    }, {
      validator: this.validationService.passwordMatch('password', 'confirmPassword')
    }
  );
  isLoggedIn: boolean = false;

  private isLoginFailed: boolean = false;
  private errorMessage: string = '';
  private isSuccessful: boolean = false;
  private isSignUpFailed: boolean = false;
  private registerErrorMessage: string = '';

  constructor(
    private snackbarService: SnackbarService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private validationService: ValidationService,
    private notificationService: NotificationService
  ) {
  }

  get emailLoginValue() {
    return this.loginForm.controls['email'];
  }

  get passwordValue() {
    return this.loginForm.controls['password'];
  }

  get emailSignUpValue() {
    return this.signUpForm.controls['email'];
  }

  get usernameValue() {
    return this.signUpForm.controls['username'];
  }

  get createPassword() {
    return this.signUpForm.controls['password'];
  }

  get confirmPassword() {
    return this.signUpForm.controls['confirmPassword'];
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  openSnackBar(message: string) {
    this.snackbarService.openSnackBar(message);
  }

  openSuccessSnackBar(message: string) {
    this.snackbarService.openSuccessSnackBar(message);
  }

  openErrorSnackBar(message: string) {
    this.snackbarService.openErrorSnackBar(message);
  }

  onSignUpSubmit() {
    const value = this.signUpForm.value;

    this.authService.signUp({
      username: value.username,
      email: value.email,
      password1: value.password,
      password2: value.confirmPassword
    })
      .subscribe(
        {
          next: data => {
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            if (data) {
              this.showLogin();
              this.openSuccessSnackBar("Signup successful! Please login to continue.")
            }
            this.tabGroup.selectedIndex = 0;
            this.signUpForm.reset();
            Object.keys(this.signUpForm.controls).forEach(key => {
              this.signUpForm.controls[key].setErrors(null)
            });
            this.signUpForm.markAsPristine();
            this.signUpForm.markAsUntouched();
            this.signUpForm.updateValueAndValidity();
            this.signUpForm.clearValidators();
          },

          error: error => {
            if (error.error.email) {
              this.registerErrorMessage = "Email is already registered!";
            }
            if (error.error.username) {
              this.registerErrorMessage = "Username is already registered!";
            }
            if (error.error.email && error.error.username) {
              this.registerErrorMessage = "Email and username are already registered!";
            }
            this.isSignUpFailed = true;
            this.isSuccessful = false;
            this.openErrorSnackBar(this.registerErrorMessage);
          }
        }
      )
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    this.authService.login({email: value.email, password: value.password})
      .subscribe(
        (data: LoginResponse) => {
          this.storageService.saveUser(data.user);
          this.storageService.saveAccessToken(data.access_token);
          this.storageService.saveRefreshToken(data.refresh_token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.openSnackBar("Successfully logged in as " + data.user.username);
          this.authService.setLoggedIn(true);

          this.notificationService.connect(this.storageService.getUser().pk);

          this.router.navigate(['/my-scripts']);

        },
        err => {
          this.errorMessage = "Invalid email or password!";
          this.isLoginFailed = true;
          this.isLoggedIn = false;
          this.openErrorSnackBar(this.errorMessage);
        }
      );

  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.openSnackBar("Successfully logged out!");
  }

  onForgotPasswordClick() {
    this.router.navigate(['/forgot-password']);
  }

  private showLogin() {
    this.router.navigate(['/home-page']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
