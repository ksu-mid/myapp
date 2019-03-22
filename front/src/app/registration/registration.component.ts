import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }
  alert_text: String;
  show_alert: Boolean = false;
  l_name: String;
  l_password: String;

  //
  // Registration
  //
  register() {

    this.my_alert("Регистрация и авторизация успешна")

    this.api.reg({ email: this.l_name, password: this.l_password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          this.my_alert("Регистрация и авторизация успешна")
          window.localStorage.setItem("token", result.token)
        }
        else this.my_alert("Пользователь с таким именем уже существует")
      });
  }

    my_alert(text: any) {
    this.alert_text = text
    this.show_alert = true
  }
}

