import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-complex-result',
  templateUrl: './complex-result.component.html',
  styleUrls: ['./complex-result.component.css',
    '../court.css',
    '../../testing/mobility/mobility.component.css']
})
export class ComplexResultComponent implements OnInit {

  idgruptest: string = '';
  guid: string = '';
  testEvent: any = {
    "person":
      { "first_name": "", "last_name": "", "birthday": "" },
    "assessor": "", "date": "", "venue": ""
  };

  mobilityArea: string = '';
  itnArea: number = 0;

  constructor(
    private _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    private _activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      this.guid = params['idtest'];
      this.idgruptest = params['idgruptest'];
      this.updateTestEvent();
      this.updateMobilityArea();
    });
  }

  updateTestEvent() {
    this._api.getTypeRequestParams('api/testevent/', { 'id_db': this.guid }).subscribe((data: any) => {
      this.testEvent = data;
      this.itnArea = this.testEvent['itn']
    });
  }

  updateMobilityArea() {
    var _params = {
      'guid': this.guid,
      'stage_number': 0,
      'task': 'mobility'
    };
    this._api.getTypeRequestParams('api/detailsserving', _params).subscribe((data: any) => {
      this.mobilityArea = data['first_bounce'];
    });
  }

}
