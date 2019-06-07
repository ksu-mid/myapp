import { Component, OnInit } from '@angular/core';
import { CookieService } from './services/cookie.service';
import { text } from '@angular/core/src/render3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  constructor(
    private cookie: CookieService) { }
  ngOnInit() {
    setInterval(() => {
      this.cookie.refresh_token()
    }, 30 * 60 * 1000)
  }
  title = 'front';

}
