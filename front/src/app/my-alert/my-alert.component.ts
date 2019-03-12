import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent implements OnInit {

  constructor() { }
  @Input() inner_show_alert: Boolean;
  @Input() alert_text: String;
  ngOnInit() {
  }

  close_my_alert() {
    this.inner_show_alert = false
  }

}
