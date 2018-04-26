import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPComponent } from './dashboard-p/dashboard-p.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: DashboardPComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPComponent],

})
export class DashboardModule { }
