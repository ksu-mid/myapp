import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";
import { CookieService } from '../services/cookie.service';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private cookie: CookieService,
    ) { }

  ngOnInit() {
    this.get_personal_data()
  }
  user: any = [];
  current_text: Boolean = false;
  text_edit: Boolean = true;
  corrected_firstName: String;
  corrected_lastName: String;
  corrected_sex: String;
  corrected_dob: String;
  corrected_email: String;


  get_personal_data() {
    const token = this.cookie.get_token()
    this.api.get_personal_data({ token })
      .subscribe((result: any) => {
        console.log(result)
        this.user = result.user[0]
      });
  }
  correct() {
    this.current_text = true;
    this.text_edit = false;
  }

  pass_correct(corrected_firstName, corrected_lastName, corrected_sex, corrected_dob, corrected_email, user) {
    const firstName = this.corrected_firstName
    const lastName = this.corrected_lastName
    const sex = this.corrected_sex
    const dob = this.corrected_dob
    const email = this.corrected_email
    const _id = this.user._id
    this.api.correct_data({ firstName, lastName, sex, dob, email, _id })
      .subscribe((result: any) => {
        console.log(result, )
        this.get_personal_data()
        this.save_new_data ()
      });
  }

  save_new_data (){
    this.current_text = false;
    this.text_edit = true;
  }
}
