// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
// import { Subscription, Observable } from 'rxjs';


// import { UserValidationService } from '../services/user-validation.service';

// @Component({
//   selector: 'app-valid',
//   templateUrl: './valid.component.html',
//   styleUrls: ['./valid.component.scss']
// })
// export class ValidComponent implements OnInit, OnDestroy {
//   userForm: FormGroup;
//   userTypes: string[];

//   private userTypeSubscription: Subscription;

//   constructor(private fb: FormBuilder, private userValidation: UserValidationService) { }

//   ngOnInit() {
//     this.userTypes = ['администратор', 'пользователь'];
//     this.initForm();
//     this.subscribeToUserType();
//   }

//   ngOnDestroy() {
//     this.userTypeSubscription.unsubscribe();
//   }

//   public onSubmit(): void {
//     const controls = this.userForm.controls;

//     Object.keys(controls).forEach(key => {
//       controls[key].markAsTouched();
//     })
//   }

//   /** Инициализация формы */
//   private initForm(): void {
//     this.userForm = this.fb.group({
//       type: [null, [Validators.required]],
//       name: [null, [
//         Validators.required,
//         Validators.pattern(/^[A-z0-9]*$/),
//         Validators.minLength(3)],
//         [this.nameAsyncValidator.bind(this)]
//       ],
//       address: null,
//       password: [null, [
//         Validators.required,
//         this.passwordValidator]
//       ]
//     });
//   }

//   /** Подписка на тип пользователя */
//   private subscribeToUserType(): void {
//     this.userTypeSubscription = this.userForm.get('type')
//       .valueChanges
//       .subscribe(value => this.toggleAddressValidators(value));
//   }

//   /** Динамическое добавление валидаторов на адрес */
//   private toggleAddressValidators(userType): void {
//     /** Контрол адреса */
//     const address = this.userForm.get('address');

//     /** Массив валидаторов */
//     const addressValidators: ValidatorFn[] = [
//       Validators.required,
//       Validators.min(3)
//     ];

//     /** Если не админ, то добавляем валидаторы */
//     if (userType !== this.userTypes[0]) {
//       address.setValidators(addressValidators);
//     } else {
//       address.clearValidators();
//     }

//     /** Обновляем состояние контрола */
//     address.updateValueAndValidity();
//   }

//   /** Валидатор для пароля */
//   private passwordValidator(control: FormControl): ValidationErrors {
//     const value = control.value;
//     /** Проверка на содержание цифр */
//     const hasNumber = /[0-9]/.test(value);
//     /** Проверка на содержание заглавных букв */
//     const hasCapitalLetter = /[A-Z]/.test(value);
//     /** Проверка на содержание прописных букв */
//     const hasLowercaseLetter = /[a-z]/.test(value);
//     /** Проверка на минимальную длину пароля */
//     const isLengthValid = value ? value.length > 7 : false;

//     /** Общая проверка */
//     const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && isLengthValid;

//     if (!passwordValid) {
//       return { invalidPassword: 'Пароль не прошел валидацию' };
//     }

//     return null;
//   }

//   /** Асинхронный валидатор */
//   nameAsyncValidator(control: FormControl): Observable<ValidationErrors> {
//     return this.userValidation.validateName(control.value);
//   }

// }