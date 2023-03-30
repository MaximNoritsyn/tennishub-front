import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grouptest-dashboard',
  templateUrl: './grouptest-dashboard.component.html',
  styleUrls: ['./grouptest-dashboard.component.css']
})
export class GrouptestDashboardComponent implements OnInit {

  group_test: any = {};
  mode: string = 'new';
  task: string = 'gsd';

  constructor(private _api: ApiService,
    public _auth: AuthService,
    public _router: Router) { }

  ngOnInit() {
  }

}
