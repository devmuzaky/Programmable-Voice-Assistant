import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('elRef') comp: ElementRef;

  isLogin = false;
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
    ],

    'email': [
      {type: 'required', message: 'please enter a valid email address.'}
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

  constructor(private authService: AuthService, private router: Router) {
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
        this.register.classList.remove('no-invis');
        this.register.classList.remove('form-box');
        this.login.classList.remove('invis');
        this.login.classList.add('form-box');
      });
    });
  }


  ngOnInit(): void {
    this.formDataLogin = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
    this.formDataSignUp = new FormGroup({
        name: new FormControl('', Validators.compose([
          Validators.required
        ])),
        email: new FormControl('',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30)
          ])
        ),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ])),
        confirm_password: new FormControl('', Validators.compose([
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
    const userName = this.formDataLogin.value.userName;
    const password = this.formDataLogin.value.password;
    this.authService.login({userName, password}).subscribe(data => {
      if (data) {
        this.isLogin = true;
        this.router.navigate(['/home']);
      }
    });
  }

  onSignUpSubmit() {
    const userName = this.formDataSignUp.value.userName;
    const name = this.formDataSignUp.value.name;
    const email = this.formDataSignUp.value.email;
    const password = this.formDataSignUp.value.password;
    this.authService.signUp({userName, name, email, password}).subscribe({
      next: data => {
        if (data) {
          this.router.navigate(['/login']);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }


  Password() {
    const password = this.formDataSignUp?.controls.password.value;
    const confirmPassword = this.formDataSignUp?.controls.confirm_password.value;
    this.isMatchPassword = password === confirmPassword ? null : {passwordNotMatch: true};
  }
}
