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
  corrected_text: String [] = ['1', '2'];
  text_edit: Boolean = true;
  current_text: Boolean = false;
  message: any;
  

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

  show_messages() {
    this.api.get_messages()
      .subscribe((result: any) => {
        console.log(result, "Messages")
        this.messages = result.message
      });
  }

  correct(i: any) {
    console.log (this.corrected_text)
    this.text_edit = false;
    this.current_text = true;
  }

  send_correct(i, M) {
    console.log (M)
  //   const corrected_text = this.corrected_text
  //   this.api.cor ({corrected_text})
  //   .subscribe((result: any) => {
  //     console.log(result)
  //      });
  }

  // show_cor_messages() {
  //   this.api.get_cor_messages()
  //     .subscribe((result: any) => {
  //       console.log(result, "Messages")
  //       this.messages = result.message
  //     });
  // }
}
