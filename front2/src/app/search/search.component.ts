import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  search_form: FormGroup
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()

  }

  createForm() {
    this.search_form = this.formbuilder.group({
      search_control: [null],
    })
  }

  search() {
    console.log ("it's working")
    const query = this.search_form.value.search_control
    console.log (query)
  }

  clear_search() {
    console.log ("it's also working")
  }
}
