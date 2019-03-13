import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
       ) { }
  ngOnInit() {
   
  }
  title = 'front';
 
}
