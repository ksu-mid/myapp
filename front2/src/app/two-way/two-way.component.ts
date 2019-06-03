import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-two-way',
  templateUrl: './two-way.component.html',
  styleUrls: ['./two-way.component.sass']
})
export class TwoWayComponent implements OnInit {

  constructor() { }
  @Input() state: any;
  @Output() onChanged = new EventEmitter<any>()

  ngOnInit() {
    console.log (this.state)
  }
  make_event(){
    console.log ("child")
    const result = {message:"hello"}
    this.onChanged.emit(result) 
  }

}
