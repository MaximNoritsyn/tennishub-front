import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Translate_Service } from './services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  currentlang: string;

  constructor(public _auth: AuthService,
              private _api: ApiService,
              public _router: Router,
              public translate_service: Translate_Service) { 
                this.currentlang = this.translate_service.getLanguage();
              }
  
  ngOnInit(): void {
    this._auth.getUser();
  }

  logout(): void {
    this._auth.clearStorage();
  }

  switchLanguage(language: string) {
    this.translate_service.switchLanguage(language);
  }

  getLanguage() {
    this.currentlang = this.translate_service.title;
  }

}
