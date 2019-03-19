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
  register() {

    this.my_alert("Регистрация и авторизация успешна")

    this.api.reg({ email: this.l_name, password: this.l_password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          window.localStorage.setItem("token", result.token)
          this.my_alert("Регистрация и авторизация успешна")
        }
        else this.my_alert("Пользователь с таким именем уже существует")
      });

  }
  my_alert(text: any) {
    this.alert_text = text 
    this.show_alert = true
  }
}
