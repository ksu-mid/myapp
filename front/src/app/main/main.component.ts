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

}
