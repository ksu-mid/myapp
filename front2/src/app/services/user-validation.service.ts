// import { Injectable } from '@angular/core';
// import { ValidationErrors } from '@angular/forms';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/delay';

// @Injectable()
// export class UserValidationService {
//   private users: string[];

//   constructor() {
//     this.users = ['john', 'ivan', 'anna'];
//   }

//   /** Запрос валидации */
//   validateName(userName: string): Observable<ValidationErrors> { // указываем тип метода Observable (типизация)
//     //стандартная конструкция для Observable
//     return new Observable<ValidationErrors>(observer => {
//       const user = this.users.find(user => user === userName);
//       //другой вариант записи: const user = this.users.find(function (user){ return user === userName });
//       /** если пользователь есть в массиве, то возвращаем ошибку */
//       if (user) {
//         observer.next({
//           nameError: 'Пользователь с таким именем уже существует'
//         });
//         observer.complete();
//       }
//       /** Если пользователя нет, то валидация успешна */
//       observer.next(null);
//       observer.complete();
// // с помощью метода delay создается задержка как с setTimeout
//     }).delay(1000);
//   }

// }
