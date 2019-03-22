import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  alert_text: String;
  show_alert: Boolean = false;
  l_name: String;
  l_password: String;

  ngOnInit() {
  }

  //
  // Registration
  //
  login() {

    this.my_alert("Авторизация успешна")
    const email = this.l_name
    const password = this.l_password
    this.api.log({ email, password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          window.localStorage.setItem("token", result.token)
          this.my_alert("Авторизация успешна")
        }
        else this.my_alert("Ошибка авторизации")
      });
  }
 
  // set_token() {
  //   this.api.get_token()
  //     .subscribe((result: any) => {
  //       console.log(result.token)
  //       window.localStorage.setItem("token", result.token)
  //     });
  // }

  my_alert(text: any) {
    this.alert_text = text
    this.show_alert = true
  }
}
