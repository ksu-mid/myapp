import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from "@angular/router";
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  alert_text: String;
  show_alert: Boolean = false;
  l_name: String;
  l_password: String;
  user_information: any = true;
  registration_form: any = false;
  first_name: String;
  last_name: String;
  date_of_birth: Date;
  sex: String;
  eye_mode: String = 'password';
  exclamation_name: String = "";


  //
  // Registration
  //
  // register() {

  //   this.my_alert("Регистрация и авторизация успешна")

  //   this.api.reg({ email: this.l_name, password: this.l_password })
  //     .subscribe((result: any) => {
  //       console.log(result)
  //       if (result.ok) {
  //         this.my_alert("Регистрация и авторизация успешнаa")
  //         window.localStorage.setItem("token", result.token)
  //         this. take_information()
  //       }
  //       else this.my_alert("Пользователь с таким именем уже существует")
  //     });
  // }

  register_db() {

    // this.my_alert("Регистрация и авторизация успешна")

    this.api.reg_db({ email: this.l_name, password: this.l_password })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          // this.my_alert("Регистрация и авторизация успешна")
          alert("Регистрация успешна")
          window.localStorage.setItem("token", result.token)
          this.take_information()
        }
        else alert("Пользователь с таким именем уже существует")
        // this.my_alert("Пользователь с таким именем уже существует")
      });
  }

  add_infoDB() {
    console.log(this.first_name, this.last_name, this.date_of_birth, this.sex)

    this.api.add_db({ firstName: this.first_name, lastName: this.last_name, dob: this.date_of_birth, sex: this.sex, email: this.l_name })
      .subscribe((result: any) => {
        console.log(result)
        if (result.ok) {
          alert("Информация добавлена")
          this.router.navigate(['/main']);
        }
      });

  }

  my_alert(text: any) {
    this.alert_text = text
    this.show_alert = true
  }

  //
  //Information window
  //
  take_information() {
    this.user_information = false;
    this.registration_form = true;
  }

  show_password() {
    if (this.eye_mode == 'text') this.eye_mode = 'password'
    else this.eye_mode = 'text'
   

  }
}

