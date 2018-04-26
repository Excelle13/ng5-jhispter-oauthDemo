import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPComponent } from './login-p/login-p.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: LoginPComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPComponent]
})
export class LoginModule { }
