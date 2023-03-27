import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  currentPage = 1;
  totalElements = 0;
  pageSize = 10;
  listOfPages: number[] = [];

  players: any[] = [];
  events: any[] = [];

  constructor(private _api: ApiService,
              public _auth: AuthService,
              public _router: Router
              ) { }

  ngOnInit() {
    this.loadArrays()
  }

  getPlayers() {
    this._api.getTypeRequestParams('api/players', {page: this.currentPage}).subscribe((data: any) => {
      this.players = data.results;
      this.totalElements = data.count;
      this.loadPages();
    });
  };

  getEvents() {
    this._api.getTypeRequestParams('api/tests', {page: this.currentPage}).subscribe((data: any) => {
      this.events = data.results;
      this.totalElements = data.count;
    });
  }

  loadArrays() {
    if (this._auth.isLoggedIn()) {
      if (this._auth.isCoach()) {
        this.getPlayers();
      } else {
        this.getEvents();
      }
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadArrays();
  }

  gotoPlayer(id_db: any) {
    this._router.navigate(['/player', id_db]);
  }

  gotoEvent(id_db: any) {
    this._router.navigate(['/event', id_db]);
  }

  isNextPageDisabled() {
    return this.currentPage * this.pageSize >= this.totalElements;
  }

  isPreviousPageDisabled() {
    return this.currentPage <= 1;
  }
  
  loadPages() {
    this.listOfPages = [];
    for (let i = 1; i <= Math.ceil(this.totalElements / this.pageSize); i++) {
      this.listOfPages.push(i);
    }
  }


}
