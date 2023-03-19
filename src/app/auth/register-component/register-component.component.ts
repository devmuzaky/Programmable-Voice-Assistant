import {Component, ElementRef, Input, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {StorageService} from "../services/storage.service";
import {SnackbarService} from "../../shared/snackbar-service/snackbar.service";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../interface/login.response";
import {createPasswordStrengthValidator} from "../password-strength.validator";

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  @ViewChild('elRef') comp: ElementRef;

  @Input('mat-stretch-tabs')
  stretchTabs: boolean
  submitted = false;


  loginForm = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      createPasswordStrengthValidator()
    ]]
  });

  signUpForm = this.fb.group({
      name: ['', Validators.compose([
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
        Validators.minLength(8),
        Validators.maxLength(20),
        createPasswordStrengthValidator()
      ])],
    }, {
      validator: this.confirmPasswordValidator('password', 'confirmPassword')
    }
  );
  private isLoginFailed: boolean = false;
  private isLoggedIn: boolean = false;
  private emailS: string ;
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
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.emailS = this.storageService.getUser().roles;
    }

  }



  onSignUpSubmit(){
    const value = this.signUpForm.value;

    this.authService.signUp({username:value.username, email: value.email, password1: value.password, password2: value.confirmPassword})
      .subscribe(
        {
          next: data => {
            this.isSuccessful = true;
                this.isSignUpFailed = false;
                if (data) {
                  this.showLogin();
                  this.openSnackBar("Your registration is successful!");
                }
          },
          error: error => {
            this.registerErrorMessage = error.error.detail;
                this.isSignUpFailed = true;
                this.openSnackBar("Signup failed! " + this.registerErrorMessage)
          }
        }
      )
  }


  openSnackBar(message: string) {
    this.snackbarService.openSnackBar(message);
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    this.authService.login(value.email, value.password)
      .subscribe(
              (data: LoginResponse) => {
                this.storageService.saveUser(data.user);
                this.storageService.saveAccessToken(data.access_token);
                this.storageService.saveRefreshToken(data.refresh_token);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.emailS = this.storageService.getUser().email;
                this.openSnackBar("Logged in as " + this.emailS);
                this.http.get('http://localhost:8000/scripts/api/').subscribe(
                  (data) => {
                    console.log(data)

                  }
                )  },
        err => {
                  this.errorMessage = err.error.detail;
                  this.isLoginFailed = true;
                  console.log(err)
                  this.openSnackBar("Login failed: " + this.errorMessage)
        }
      );
  }

  private confirmPasswordValidator(password1: string, confirmPassword1: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[password1];
      const confirmPassword = formGroup.controls[confirmPassword1];

      if (confirmPassword.errors && !confirmPassword.errors.passwordMismatch) {
        return;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({passwordMismatch: true});
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  private showLogin() {
    this.router.navigate(['/login']);
  }
}
