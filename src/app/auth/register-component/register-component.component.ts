import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {StorageService} from "../services/storage.service";
import {SnackbarService} from "../../shared/snackbar-service/snackbar.service";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../interface/login.response";

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('elRef') comp: ElementRef;

  isSuccessful = false;
  isSignUpFailed = false;
  registerErrorMessage = '';

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  emial: string = '';

  items;
  questions;
  login;
  register;

  isMatchPassword;
  formDataLogin: FormGroup;
  formDataSignUp: FormGroup;

  error_messages = {
    'name': [
      {type: 'required', message: 'Name is required.'},
      {type: 'minlength', message: 'Name length.'},
      {type: 'maxlength', message: 'Name length.'}
    ],

    'email': [
      {type: 'required', message: 'please enter a valid email address.'},
      {type: 'email', message: 'please enter a valid email address.'}
    ],

    'password': [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password length.'},
      {type: 'maxlength', message: 'password length.'}
    ],
    'passwordNotMatch': [
      {type: 'passwordNotMatch', message: 'password not match.'}
    ]
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    private http: HttpClient,
  ) {
  }

  ngAfterViewInit(): void {
    this.items = this.comp.nativeElement.querySelectorAll('.js-item');
    this.questions = this.comp.nativeElement.querySelectorAll('.question');
    this.login = this.comp.nativeElement.querySelector('#js-login');
    this.register = this.comp.nativeElement.querySelector('#js-register');


    this.items.forEach((i) => {
      const myInput = i.children[1];

      i.addEventListener('click', () => {
        myInput.focus();
        i.classList.add('focus');
      });

      i.addEventListener('focusout', () => {
        if (myInput.value.length === 0) {
          i.classList.remove('focus');
        }
      });
    });


    this.questions.forEach((i) => {
      i.addEventListener('click', () => {
        if (i.dataset.sign === 'register') {
          this.login.classList.remove('form-box');
          this.login.classList.add('invis');
          this.register.classList.add('form-box');
          this.register.classList.add('no-invis');
          return;
        }
        this.showLogin();
      });
    });
  }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.emial = this.storageService.getUser().roles;
    }

    this.formDataLogin = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
    this.formDataSignUp = new FormGroup({
        name: new FormControl('test1', Validators.compose([
          Validators.required
        ])),
        email: new FormControl('test1@gmail.com',
          Validators.compose([
            Validators.required,
            Validators.email
          ])
        ),
        password: new FormControl('test1@123', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ])),
        confirm_password: new FormControl('test1@123', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]))

      },
      {
        validators: this.Password.bind(this)
      });

  }

  onLoginSubmit() {
    const username = this.formDataLogin.value.userName;
    const password = this.formDataLogin.value.password;
    this.authService.login({username, password}).subscribe(
      {
        next: (data: LoginResponse) => {
          this.storageService.saveUser(data.user);
          this.storageService.saveAccessToken(data.access_token);
          this.storageService.saveRefreshToken(data.refresh_token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.emial = this.storageService.getUser().email;
          this.openSnackBar("Logged in as " + this.emial);
          this.http.get('http://localhost:8000/scripts/api/').subscribe(
            (data) => {
              console.log(data)

            }
          )
        },
        error: err => {
          this.errorMessage = err.error.detail;
          this.isLoginFailed = true;
          console.log(err)
          this.openSnackBar("Login failed: " + this.errorMessage)
        }
      });

  }

  onSignUpSubmit() {
    const userName = this.formDataSignUp.value.name;
    const email = this.formDataSignUp.value.email;
    const password1 = this.formDataSignUp.value.password;
    const password2 = this.formDataSignUp.value.confirm_password;
    this.authService.signUp({username: userName, email, password1, password2}).subscribe({
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
    });
  }

  Password() {
    const password = this.formDataSignUp?.controls.password.value;
    const confirmPassword = this.formDataSignUp?.controls.confirm_password.value;
    this.isMatchPassword = password === confirmPassword ? null : {passwordNotMatch: true};
  }

  showLogin() {
    this.register.classList.remove('no-invis');
    this.register.classList.remove('form-box');
    this.login.classList.remove('invis');
    this.login.classList.add('form-box');
  }

  openSnackBar(message: string) {
    this.snackbarService.openSnackBar(message);
  }
}
