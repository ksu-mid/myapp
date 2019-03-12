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

  get_messages() {
    return this.http.get('http://localhost:3000/message');
  }

}
