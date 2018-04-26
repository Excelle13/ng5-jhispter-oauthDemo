import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-login-p',
  templateUrl: './login-p.component.html',
  styleUrls: ['./login-p.component.css']
})
export class LoginPComponent implements OnInit {

  isAuth;

  constructor(public auth: AuthenticationService) {
  }

  ngOnInit() {

    console.log('getToken---',this.auth.getAccessToken());
  }

  getToken(){
    this.auth.loginMethodDemo('admin','admin').subscribe((data)=>{
      console.log('data--', data);

      this.isAuthorized()
    })
  }

  isAuthorized(){
    this.auth.isAuthorized().subscribe((data)=>{
      // console.log(data);
      this.isAuth = data;
    })
  }

}
