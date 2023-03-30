import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-grouptest',
  templateUrl: './list-grouptest.component.html',
  styleUrls: ['./list-grouptest.component.css']
})
export class ListGrouptestComponent implements OnInit {

  currentPage = 1;
  totalElements = 0;
  pageSize = 10;
  listOfPages: number[] = [];

  group_tests: any = [];

  constructor(private _api: ApiService,
    public _auth: AuthService,
    public _router: Router) { }

  ngOnInit() {
    this.loadGroupTests();
  }

  async loadGroupTests(): Promise<void> {
    this._api.getTypeRequestParams('api/group_tests', {page: this.currentPage}).subscribe((data: any) => {
      this.group_tests = data.result;
      this.totalElements = data.count;
      this.loadPages();
    });
  }

  onTestClick(testId: string): void {
    this._router.navigate(['/grouptestdashboard', testId]);
  }

  newCoachTest(): void {
    this._router.navigate(['/grouptestdashboard', 'new']);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadGroupTests();
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
