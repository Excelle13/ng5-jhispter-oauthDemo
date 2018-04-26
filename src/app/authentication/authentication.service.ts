import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {AuthService} from "ngx-auth";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

  }

  getAccessToken(): Observable<string> {
    console.log('---------getAccessToken----------',this.tokenStorage.getAccessToken());
    return this.tokenStorage.getAccessToken();
  }

  //
  // getHeaders(token: string): { [p: string]: string | string[] } {
  //   return undefined;
  // }

  isAuthorized(): Observable<boolean> {
    console.log('---------isAuthorized----------',this.tokenStorage
      .getAccessToken()
      .map(token => !!token));

    return this.tokenStorage
      .getAccessToken()
      .map(token => !!token);
  }

  refreshShouldHappen(response: HttpErrorResponse): boolean {
    console.log('---------refreshShouldHappen----------', `${this.getTokenUrl}`);

    return response.status === 0||response.status === 401

  }

  /*深圳环境*/
  baseUrl = 'http://xxxxxxxx/jhbackend/api/heiyi/';
  logoutUrl = 'http://xxxxxxxx/jhbackend/api/logout';
  getTokenUrl = 'http://xxxxxxxx/jhbackend/oauth/token';


  loginMethodDemo(username, password): Observable<any> {
    console.log('---------loginMethodDemo----------');
    const data = 'username=' + username + '&password=' +
      password + '&grant_type=password&scope=read%20write&' +
      'client_secret=my-secret-token-to-change-in-production&client_id=heiyiapp';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + 'aGVpeWlhcHA6bXktc2VjcmV0LXRva2VuLXRvLWNoYW5nZS1pbi1wcm9kdWN0aW9u'
    });

    return this.http.post(this.getTokenUrl, data, {headers})
      .do((tokens: TokenData) => this.saveAccessData(tokens));

  }

  refreshToken(): Observable<TokenData> {

    // const data = 'refresh_token=' + refreshToken +
    //   '&grant_type=refresh_token' +
    //   '&client_secret=my-secret-token-to-change-in-production' +
    //   '&client_id=heiyiapp';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + 'aGVpeWlhcHA6bXktc2VjcmV0LXRva2VuLXRvLWNoYW5nZS1pbi1wcm9kdWN0aW9u'
    });

    console.log('---------refreshToken----------');
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        console.log('refreshToken---', refreshToken);
        const data = 'refresh_token=' + refreshToken +
          '&grant_type=refresh_token' +
          '&client_secret=my-secret-token-to-change-in-production' +
          '&client_id=heiyiapp';

        return this.http.post(`${this.getTokenUrl}`, data, {headers});
      })
      .do(this.saveAccessData.bind(this))
      .catch((err) => {
        this.logout();

        return Observable.throw(err);
      });
  }

  verifyTokenRequest(url: string): boolean {
    console.log('---------verifyTokenRequest----------');
    // return url.endsWith('/oauth/token');
    return url.endsWith('/token');
  }


  /**
   * EXTRA AUTH METHODS
   */

  public login(): Observable<any> {
    console.log('---------login----------');

    return this.http.post(`http://localhost:3000/login`, {})
      .do((tokens: TokenData) => this.saveAccessData(tokens));
  }

  /**
   * Logout
   */
  public logout(): void {
    console.log('---------logout----------');

    this.tokenStorage.clear();
    location.reload(true);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({access_token, refresh_token}: TokenData) {
    console.log('---------saveAccessData----------');
    this.tokenStorage
      .setAccessToken(access_token)
      .setRefreshToken(refresh_token);
  }
}

interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
