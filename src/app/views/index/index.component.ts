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

  async ngOnInit() {
    this.loadArrays()
  }

  async loadArrays(): Promise<void> {
    if (this._auth.isLoggedIn()) {
      if (await this._auth.isCoachAs()) {
        await this.getPlayers();
      } else {
        await this.getEvents();
      }
    }
  }
  
  async getPlayers() {
    const data: any = await this._api.getTypeRequestParams('api/players', {page: this.currentPage}).toPromise();
    this.players = data.result;
    this.totalElements = data.count;
    this.loadPages();
  };
  
  async getEvents() {
    const data: any = await this._api.getTypeRequestParams('api/tests', {page: this.currentPage}).toPromise();
    this.events = data.results;
    this.totalElements = data.count;
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
