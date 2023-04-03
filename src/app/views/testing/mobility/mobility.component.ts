import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mobility',
  templateUrl: './mobility.component.html',
  styleUrls: ['./mobility.component.css', '../court.css']
})
export class MobilityComponent implements OnInit {

  idgruptest: string = '';
  guid: string = '';
  testEvent: any = {};
  playername: string = '';

  private timeoutId!: ReturnType<typeof setTimeout>;

  first_bounce: string = '';

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
      this.updateBounces();
    });
  }

  updateTestEvent() {
    this._api.getTypeRequestParams('api/testevent/', { 'id_db': this.guid }).subscribe((data: any) => {
      this.testEvent = data;
      this.playername = this.testEvent['person']['first_name'] + ' ' + this.testEvent['person']['last_name'];
    });
  }

  updateBounces() {
    var _params = {
      'guid': this.guid,
      'stage_number': 0,
      'task': 'mobility'
    };
    this._api.getTypeRequestParams('api/detailsserving', _params).subscribe((data: any) => {
      this.first_bounce = data['first_bounce'];
    });
  }

  onClickArea(area: string) {
    this.startTimeout();
    this.first_bounce = area;
  }

  startTimeout() {
    this.timeoutId = setTimeout(() => {
      this.sendBounces();
    }, 1000);
  }

  cancelTimeout() {
    clearTimeout(this.timeoutId);
  }

  sendBounces() {
    this.cancelTimeout();
    var url = 'api/testevent/mobility/'
    this._api.postTypeRequest(url, {
      'guid': this.guid,
      'stage_number': 0,
      'first_bounce': this.first_bounce
    }).subscribe((data: any) => {
      if (data['result'] === 'ok') {
        this.finishTask();
      }
    });
  }

  finishTask() {

    if (this.idgruptest !== '') {
      this._router.navigate(['/grouptestdashboard/', this.idgruptest, 'mobility']);
    } else {
      this._router.navigate(['testing/results', this.guid]);
    }
  }

}
