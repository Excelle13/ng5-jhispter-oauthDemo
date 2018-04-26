import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {Ng2Webstorage} from "ngx-webstorage";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthModule, ProtectedGuard, PublicGuard} from "ngx-auth";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: 'login',
    canActivate: [PublicGuard],
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    canActivate: [ProtectedGuard],
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2Webstorage.forRoot({
      prefix: "ng2-webstorage",
      separator: "|",
      caseSensitive: false
    }),
    // AuthenticationModule,
    RouterModule.forRoot(routes),

    AuthenticationModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
