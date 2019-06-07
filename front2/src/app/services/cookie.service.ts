import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  get_token() {
    var results = document.cookie.match('(^|;) ?' + 'token_name' + '=([^;]*)(;|$)');
    if (results)
      return (unescape(results[2]));
    else
      return null;
  }

  set_token(token) {
    var date = new Date(new Date().getTime() + 60 * 60 * 1000);
    document.cookie = `token_name=${token};path=/;expires=${date.toUTCString()}`;
  }

  refresh_token() {
    const token = this.get_token()
    this.set_token(token)
  }

  set_user(_id) {
    var date = new Date(new Date().getTime() + 60 * 60 * 1000);
    var jsonID = JSON.stringify(_id)
    document.cookie = `user=${jsonID};path=/;expires=${date.toUTCString()}`;
  }

  get_user() {
    var results = document.cookie.match('(^|;) ?' + 'user' + '=([^;]*)(;|$)');
    var _id = JSON.parse(unescape(results[2]))
    if (results) {
      console.log ("It's user's _id!", _id)
      return (_id);
      }
    else
      return null;
  
  }

  refresh_user() {
    const _id = this.get_user()
    this.set_user(_id)
  }
}