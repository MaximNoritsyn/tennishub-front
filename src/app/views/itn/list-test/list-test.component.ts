import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {

  currentPage = 1;
  totalElements = 0;
  pageSize = 10;
  listOfPages: number[] = [];

  events: any[] = [];
  id_person: string = '';

  constructor(private _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['id_db']) {
        this.id_person = params['id_db'];
      }
      this.getEvents();
    })
  }

  async getEvents() {
    const data: any = await this._api.getTypeRequestParams('api/tests', { page: this.currentPage, id_person: this.id_person }).toPromise();
    console.log(data);
    this.events = data.result;
    this.totalElements = data.count;
  }


  onPageChange(page: number) {
    this.currentPage = page;
    this.getEvents();
  }

  gotoEvent(id_db: any) {
    this._router.navigate(['/testing/results/', id_db]);
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
