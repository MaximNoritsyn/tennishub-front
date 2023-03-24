import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Translate_Service } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'tennishub';
  name = '';
  currentlang: string;

  constructor(public _auth: AuthService,
              private _api: ApiService,
              public translate_service: Translate_Service) { 
                this.currentlang = this.translate_service.getLanguage();
              }
  
  ngOnInit(): void {
    if(this._auth.isLoggedIn()){
      this.getUser();
    }
  }

  getUser(): void {
    this._api.getTypeRequest('api/user').subscribe((res: any) => {
    this.name = res.person.first_name + ' ' + res.person.last_name;
    } , err => {
      console.log(err);
    }
    )};

  logout(): void {
    console.log('logout');
    this._auth.clearStorage();
  }

  switchLanguage(language: string) {
    this.translate_service.switchLanguage(language);
  }

  getLanguage() {
    this.currentlang = this.translate_service.title;
  }

}
