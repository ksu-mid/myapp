import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { MyAlertComponent } from './my-alert/my-alert.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegistrationComponent } from './registration/registration.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { TwoWayComponent } from './two-way/two-way.component';
import { SearchComponent } from './search/search.component';
// import { ValidComponent } from './valid/valid.component';
// import { UserValidationService } from './services/user-validation.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MyAlertComponent,
    LoginComponent,
    MainComponent,
    AboutUsComponent,
    RegistrationComponent,
    PersonalAreaComponent,
    TwoWayComponent,
    SearchComponent,
  
        // ValidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
