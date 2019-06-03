import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";
import { CookieService } from '../services/cookie.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private cookie: CookieService,
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
  date_of_birth: String;
  phone_number: String = "(***)-**-**-***";
  phone_number_history: String = "(***)-**-**-***";
  sex: String;
  eye_mode: String = 'password';
  exclamation_name: String = "";
  exclamation_password: String = "";
  // native_input_phone: any;



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
    if (this.l_name.length < 5) this.show_exclamation_name("Длина логина должна составлять не менее 5 знаков")
    else
      if (this.l_password.length < 8) this.show_exclamation_password("Длина пароля должна составлять не менее 8 знаков")
      else {
        this.api.reg_db({ email: this.l_name, password: this.l_password })
          .subscribe((result: any) => {
            console.log(result)
            if (result.ok) {
              // this.my_alert("Регистрация и авторизация успешна")
              this.cookie.set_token(result.token)
              alert("Регистрация успешна")
              this.take_information()
            }
            else alert("Пользователь с таким именем уже существует")
            // this.my_alert("Пользователь с таким именем уже существует")
          });
      }
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

  show_exclamation_name(text: any) {
    this.exclamation_name = text
  }
  show_exclamation_password(text: any) {
    this.exclamation_password = text
  }

  change_phone_number() {

    const phone_arr = this.phone_number.split("")
    const phone_arr_history = this.phone_number_history.split("")
    let reg = /\d+|\*+/g;
    phone_arr.map((element, index) => {
      if (phone_arr[index] !== phone_arr_history[index]) {
        const isCell = reg.test(phone_arr_history[index]);
        if (isCell) {
          phone_arr.splice(index + 1, 1)
          this.phone_number = phone_arr.join("")
          this.phone_number_history = this.phone_number
          this.set_cursor(index)
        } else {
          phone_arr.splice(index, 1)
          setTimeout(() => {
            this.phone_number = phone_arr.join("")
            this.set_cursor(index)
          }, 0)
        }
      }
    })
  }

  set_cursor(index) {
    let native_input_phone: any = document.querySelector("#inputForPhone");
    setTimeout(() => {
      native_input_phone.selectionStart = index + 1;
      native_input_phone.selectionEnd = index + 1;
    }, 0);
  }

}

