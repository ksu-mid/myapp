import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  mes(data) {
    return this.http.post('http://localhost:3000/message', data, this.httpOptions);
  }

  reg(data) {
    return this.http.post('http://localhost:3000/registration', data, this.httpOptions);
  }

  reg_db(data) {
    return this.http.post('http://localhost:3000/db-registration', data, this.httpOptions);
  }

  add_db(data) {
    return this.http.post('http://localhost:3000/db-registration2', data, this.httpOptions);
  }

  log(data) {
    return this.http.post('http://localhost:3000/login', data, this.httpOptions);
  }
  
  get_token () {
    return this.http.get('http://localhost:3000/registration');
  }

  get_messages() {
    return this.http.get('http://localhost:3000/message');
  }

  cor(data) {
    return this.http.post('http://localhost:3000/correct-message', data, this.httpOptions);
  }

  // get_cor_messages() {
  //   return this.http.get('http://localhost:3000/correct-message');
  // }
  del(data) {
    return this.http.post('http://localhost:3000/del-message', data, this.httpOptions);
  }
}
