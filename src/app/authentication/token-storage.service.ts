import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "ngx-webstorage";
import {of} from "rxjs/observable/of";

@Injectable()
export class TokenStorageService {

  constructor(private storage: LocalStorageService) {
  }

  public getAccessToken(): Observable<string> {
    const token: string = <string>this.storage.retrieve('accessToken');

    return of(token);
  }


  public getRefreshToken(): Observable<string> {
    const token: string = <string>this.storage.retrieve('refreshToken');
    return of(token);
  }

  public setAccessToken(token: string): TokenStorageService {
    this.storage.store('accessToken', token);
    return this;
  }

  public setRefreshToken(token: string): TokenStorageService {
    this.storage.store('refreshToken', token);
    return this;
  }

  public clear() {
    this.storage.clear('accessToken');
    this.storage.clear('refreshToken');
  }

}


