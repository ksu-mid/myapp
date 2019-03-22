import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private api: ApiService
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


  messages: any = [];

  //
  // Send
  //
  send() {

    const token = window.localStorage.getItem ("token")
    const text = this.text

    this.api.mes({ token, text })
      .subscribe((result: any) => {
        console.log(result)
        this.show_messages()
      });
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

  send_correct(i) {
    const text = this.corrected_text[i]
    this.text_edit[i] = false;
    this.api.cor({ i, text })
      .subscribe((result: any) => {
        console.log(result)
        this.show_messages()
      });
  }
  delete(i) {
    console.log(i, this.messages[i])
    const message = this.messages[i]
      this.api.del({ i, message })
      .subscribe((result: any) => {
        console.log(result)
        this.show_messages()
      });
  }


}
