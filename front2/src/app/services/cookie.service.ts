import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  get_token(token_name) {
    var results = document.cookie.match('(^|;) ?' + token_name + '=([^;]*)(;|$)');
    if (results)
      return (unescape(results[2]));
    else
      return null;
  }

  set_token(token) {
    var date = new Date(new Date().getTime() + 60 * 60 * 1000);
    document.cookie = `token_name=${token};path=/;expires=${date.toUTCString()}`;
  }

  refresh_token(token_name) {
    const token = this.get_token(token_name)
    this.set_token(token)
  }
}
