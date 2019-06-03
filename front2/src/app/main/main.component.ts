import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private api: ApiService,
    private cookie: CookieService,
  ) { }

  ngOnInit() {
    this.show_messages()

  }
  name: String;
  text: String;
  corrected_text: String[] = [];
  text_edit: Boolean[] = [];
  current_text: Boolean[] = [];
  message: any;
  state_for_two_way: any = {
    user: "Jack",
    role: "admin"
  }


  messages: any = [];

  //
  // Send
  //
  send() {
    const text = this.text
    const token = this.cookie.get_token('token_name')
    if (token == undefined) alert("Авторизируйтесь для отправки сообщений!")
    else {
      this.api.mes({ token, text })
        .subscribe((result: any) => {
          console.log(result)
          this.show_messages()
          this.text = ''
        });
    }
  }

  show_messages() {
    this.api.get_messages()
      .subscribe((result: any) => {
        console.log(result, "Messages")
        this.messages = result.message
      });
  }

  correct(i) {
    console.log(this.corrected_text)
    this.text_edit[i] = true;
    this.current_text[i] = false;
  }

  send_correct(i, corrected_text, message) {
    const text = this.corrected_text[i]
    const _id = message._id
    this.text_edit[i] = false;
    this.api.cor({ i, text, _id })
      .subscribe((result: any) => {
        console.log(result)
        this.show_messages()
      });
  }

  delete(i, message) {
    const _id = message._id
    this.api.del({ i, _id })
      .subscribe((result: any) => {
        console.log(result)
        this.show_messages()
      });
  }

  reaction(result) {
    console.log(result)
  }

}
