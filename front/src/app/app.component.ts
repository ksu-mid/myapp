import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
       private api: ApiService) { }
  ngOnInit() {
    this.show_messages()
  }
  title = 'front';
  name: String;
  text: String;
  l_name: String;
  l_password: String;
  private show_alert: Boolean = false;
  messages: any = [];
  
  //
  // Send
  //
  send() {
    const name = this.name
    const text = this.text

    this.api.mes({ name, text })
      .subscribe((result: any) => {
        console.log(result)
      });
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
    this.show_alert = true
    this.text = text
  }
  close_my_alert() {
    this.show_alert = false
  }

  show_messages() {
    this.api.get_messages()
      .subscribe((result: any) => {
        console.log(result, "Messages")
        this.messages = result.message
      });
  }

}
