import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {TokenStorageService} from "../../authentication/token-storage.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard-p',
  templateUrl: './dashboard-p.component.html',
  styleUrls: ['./dashboard-p.component.css']
})
export class DashboardPComponent implements OnInit {
  dataDemo;
  constructor(public auth: AuthenticationService, public store: TokenStorageService, private http: HttpClient) {

  }

  ngOnInit() {
    // console.log('getToken', this.auth.getAccessToken());
    // console.log('store--111', this.store.getAccessToken());
    // console.log('store--', this.store.getRefreshToken());

    // this.http.post('http://uat.ttoto.net/jhbackend/api/heiyi/get-store-list', {
    //   "body": {
    //     "page": 3,
    //     "pageSize": 100
    //   },
    //   "head": {
    //     "lastRespTime": "string",
    //     "serviceName": "string"
    //   }
    // }).subscribe((data) => {
    //   console.log(data);
    //   console.log(typeof data);
    // })
    /*this.http.post('http://uat.ttoto.net/jhbackend/api/heiyi/get-no-list', {
      "body": {
        "page": 0,
        "pageSize": 100,
        "type": "调出组合单号"
      },
      "head": {
        "serviceName": "string"
      }
    }).subscribe((data) => {
      console.log(data);
      console.log(typeof data);
    })*/


  }


  getData() {
    this.http.post('http://uat.ttoto.net/jhbackend/api/heiyi/get-store-list', {
      "body": {
        "page": 3,
        "pageSize": 100
      },
      "head": {
        "lastRespTime": "string",
        "serviceName": "string"
      }
    }).subscribe((data) => {


      console.log(data);
      console.log(typeof data);
      this.dataDemo = data;
    });
  }

}
