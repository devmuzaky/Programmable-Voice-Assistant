import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('elRef') comp: ElementRef

  items;
  questions;
  login;
  register;

  formDataLogin: FormGroup;
  formDataSignUp: FormGroup;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.items = this.comp.nativeElement.querySelectorAll('.js-item');
    this.questions = this.comp.nativeElement.querySelectorAll('.question');
    this.login = this.comp.nativeElement.querySelector('#js-login');
    this.register = this.comp.nativeElement.querySelector('#js-register');


    this.items.forEach((i) => {
      const myInput = i.children[1];

      i.addEventListener("click", () => {
        myInput.focus();
        i.classList.add("focus");
      });

      i.addEventListener("focusout", () => {
        if (myInput.value.length == 0) {
          i.classList.remove("focus");
        }
      });
    });

    this.questions.forEach((i) => {
      i.addEventListener("click", () => {
        if (i.dataset.sign === "register") {
          this.login.classList.remove("form-box");
          this.login.classList.add("invis");
          this.register.classList.add("form-box");
          this.register.classList.add("no-invis");
          return;
        }
        this.register.classList.remove("no-invis");
        this.register.classList.remove("form-box");
        this.login.classList.remove("invis");
        this.login.classList.add("form-box");
      });
    });
  }


  ngOnInit(): void {
    this.formDataLogin = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
    this.formDataSignUp = new FormGroup({
      userName: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')

    });
  }

  onLoginSubmit() {
    const userName = this.formDataLogin.value.userName;
    const password = this.formDataLogin.value.password;
    this.authService.login({userName, password}).subscribe(data => {
      if (data) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSignUpSubmit() {
    const userName = this.formDataSignUp.value.userName;
    const name = this.formDataSignUp.value.name;
    const email = this.formDataSignUp.value.email;
    const password = this.formDataSignUp.value.password;
    this.authService.signUp({userName, name, email, password});
  }

}
