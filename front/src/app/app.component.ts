import { Component } from '@angular/core';
import { text } from '@angular/core/src/render3';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private http: HttpClient) { }
  title = 'front';
  name: String;
  text: String;
  l_name: String;
  l_password: String;
  private show_alert: Boolean = false;
  messages: any = [
    {
      username: 'uyuiy',
      text: 'uyu iuy uyui uiyui '
    },
    {
      username: 'uyuiy',
      text: 'uyu iuy uyui uiyui '
    }
  ]

  option = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ""
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  getConfig() {
    return this.http.post('http://localhost:3000/message', {}, this.httpOptions);
  }

  reg(data) {
    return this.http.post('http://localhost:3000/registration', data, this.httpOptions);
  }


  //
  // Send
  //
  send() {
    const name = this.name
    const text = this.text
    this.messages.push({ name, text })
    this.option.body = JSON.stringify({ name, text })

    fetch('http://localhost:3000/message', this.option)
      .then(function (obj) {
        return obj.json()
      })
      .then(function (data2) {
        console.log(data2)
        //location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  //
  // Registration
  //
  register() {
    //this.option.body = JSON.stringify({ email: this.l_name, password: this.l_password })
    this.my_alert("Регистрация и авторизация успешна")

    this.reg({ email: this.l_name, password: this.l_password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          window.localStorage.setItem("token", result.token)
          this.my_alert("Регистрация и авторизация успешна")
        }
        else this.my_alert("Пользователь с таким именем уже существует")
      });

    // fetch('http://localhost:3000/registration', this.option)
    //   .then(function (obj) {
    //     return obj.json()
    //   })
    //   .then(function (result) {
    //     console.log(result)
    //     if (result.ok) {
    //       window.localStorage.setItem("token", result.token)
    //       this.my_alert("Регистрация и авторизация успешна")
    //     }
    //     else this.my_alert("Пользователь с таким именем уже существует")
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }
  my_alert(text: any) {
    this.show_alert = true
    this.text = text
  }
  close_my_alert() {
    this.show_alert = false
  }

}
