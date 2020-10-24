import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-oauth-providers',
  templateUrl: './oauth-providers.component.html',
  styleUrls: ['./oauth-providers.component.scss']
})
export class OauthProvidersComponent implements OnInit {
  code: string;
  header: HttpHeaders;
  res: any;
  
  provider: string;
  
  idtokenResponse: any;
  isAccessTokenVisible: boolean = false;
  isIdTokenVisible: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient) {    
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.provider = params['provider'];
    });
    if (this.code != undefined && this.provider != undefined) {
      this.GetToken(this.provider);
    }

  }

  SetProvider(value: string) {
    this.provider = value;
    if (this.provider == "google") {
      window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:4200/oauth?provider=google&prompt=consent&response_type=code&client_id=<Enter client id>&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline";

    }
    else if (this.provider == "github") {
      window.location.href = "https://github.com/login/oauth/authorize?client_id=<Enter client id>&redirect_uri=http://localhost:4200/oauth?provider=github&scope=user&state=testing";
    }

  }

  GetToken(value: string) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get("http://localhost:51491/api/TokenValidator/ValidateToken?provider=" + value + "&token=" + this.code, { headers: this.header }
    ).subscribe(
      data => {
        this.isAccessTokenVisible = true;
        this.res = data;
        if (value == "google") {
          this.ParseIdToken(this.res.id_token);
        }
        else if (value == "github") {
          this.GetGithubClaims(this.res.access_token);
        }
      }
    );
  }

  GetGithubClaims(accessToken: any) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.http.get("http://localhost:51491/api/TokenValidator/GithubClaims?accessToken=" + accessToken, { headers: this.header }).subscribe(
      data => {
        this.idtokenResponse = data;
        this.isIdTokenVisible = true;
        this.res=JSON.stringify(this.res);
      }
    );
  }

  ParseIdToken(idtoken: string) {
    this.header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.http.get("http://localhost:51491/api/TokenValidator/ParseIdToken?idToken=" + idtoken, { headers: this.header }).subscribe(
      data => {
        this.idtokenResponse = data;
        this.isIdTokenVisible = true;
        this.res=JSON.stringify(this.res);
      }
    );
  }

  ngOnInit(): void {
  }

}
