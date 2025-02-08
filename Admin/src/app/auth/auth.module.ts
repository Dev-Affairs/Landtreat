import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StrongPasswordDirective } from '../custom-directives/strong-password.directive';


@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    FontAwesomeModule,
    StrongPasswordDirective
  ]
})
export class AuthModule { }
