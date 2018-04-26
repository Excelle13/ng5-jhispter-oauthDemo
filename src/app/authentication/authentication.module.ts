import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AUTH_SERVICE, AuthModule, PROTECTED_FALLBACK_PAGE_URI, PUBLIC_FALLBACK_PAGE_URI} from "ngx-auth";
import {AuthenticationService} from "./authentication.service";
import {TokenStorageService} from "./token-storage.service";

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  declarations: [],
  providers:[
    TokenStorageService,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService ],
      useFactory: factory
    }
  ]
})
export class AuthenticationModule { }
