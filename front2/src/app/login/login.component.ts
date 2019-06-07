import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CookieService } from '../services/cookie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_form: FormGroup
  constructor(
    private api: ApiService,
    private router: Router,
    private cookie: CookieService,
    private formbuilder: FormBuilder
  ) { }

  alert_text: String;
  show_alert: Boolean = false;
  eye_mode: String = 'password';

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.login_form = this.formbuilder.group({
      l_name: [null, [
        Validators.required]],
      l_password: [null, [
        Validators.required,
        Validators.minLength(6)]]
      // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/)]]
    })
  }

  //
  // Login
  //
  login() {
    console.log(this.login_form.value.l_name)
    // this.my_alert("Авторизация успешна")
    const email = this.login_form.value.l_name
    const password = this.login_form.value.l_password
    this.api.log({ email, password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          // window.localStorage.setItem("token", result.token)
          console.log (this.cookie)
          this.cookie.set_token(result.token)
          const _id = result._id
          this.cookie.set_user(_id)
          this.my_alert("Авторизация успешна")
          this.router.navigate(['/main'])
        }
        else this.my_alert("Ошибка авторизации")
      });
  }

  show_password() {
    if (this.eye_mode == 'text') this.eye_mode = 'password'
    else this.eye_mode = 'text'
  }

  my_alert(text: any) {
    this.alert_text = text
    this.show_alert = true
  }
}
