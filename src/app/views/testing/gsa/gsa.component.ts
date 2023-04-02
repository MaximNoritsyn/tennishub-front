import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gsa',
  templateUrl: './gsa.component.html',
  styleUrls: ['./gsa.component.css', '../court.css']
})
export class GsaComponent implements OnInit {

  idgruptest: string = '';
  stage_number: number = 0;
  guid: string = '';
  testEvent: any = {};
  playername: string = '';

  private timeoutId!: ReturnType<typeof setTimeout>;

  first_bounce: string = '';
  second_bounce: string = '';

  isForeHand: boolean = true;
  dl: boolean = false;
  laststage = false;

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
      this.stage_number = params['stagenumber'];
      this.idgruptest = params['idgruptest'];
      this.updateTestEvent();
      this.updateBounces();
      this.ForBackhand();
      this.setlastStage();
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
      'stage_number': this.stage_number,
      'task': 'gsa'
    };
    this._api.getTypeRequestParams('api/detailsserving', _params).subscribe((data: any) => {
      this.first_bounce = data['first_bounce'];
      this.second_bounce = data['second_bounce'];
    });
  }

  onClickArea(area: string) {
    if (this.first_bounce === ''
      && this.second_bounce === '') {
      this.first_bounce = area;
    }
    else if (this.first_bounce !== ''
      && this.second_bounce === '') {
      this.second_bounce = area;
      this.startTimeout();
    }
    else if (this.first_bounce !== ''
      && this.second_bounce !== '') {
      this.first_bounce = area;
      this.second_bounce = '';
      this.cancelTimeout();
    }
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
    var url = 'api/testevent/gsa/'
    this._api.postTypeRequest(url, {
      'guid': this.guid,
      'first_bounce': this.first_bounce,
      'second_bounce': this.second_bounce,
      'stage_number': this.stage_number,
    }).subscribe((data: any) => {
      if (data['result'] === 'ok') {
        this.changeStage();
      }
    });
  }

  changeStage() {
    this.first_bounce = '';
    this.second_bounce = '';
    this.stage_number++;
    this._router.navigate(['../', this.stage_number], {
      relativeTo: this._activeRoute,
      queryParamsHandling: 'merge'
    });
    this.updateTestEvent();
    this.updateBounces();
    this.ForBackhand();
    this.setlastStage();
  }

  finishTask() {

    if (this.idgruptest !== '') {
      this._api.postTypeRequest('api/testevent/finishtask/', { "guid_test_event": this.guid, "task": "gsa" }).subscribe((data: any) => {
        if (data['result'] === 'ok') {
          this._router.navigate(['/grouptestdashboard/', this.idgruptest, 'gsa']);
        }
      });
    } else {
      this._router.navigate(['testing/serve', this.guid, '1']);
    }
  }

  ForBackhand(): void {
    if (this.stage_number == 10
      || this.stage_number == 2
      || this.stage_number == 4
      || this.stage_number == 6
      || this.stage_number == 8) {
      this.isForeHand = true;
    }
    else {
      this.isForeHand = false;
    }
    if (this.stage_number < 7) {
      this.dl = true;
    }
  }

  setlastStage(): void {

    if (this.stage_number > 12) {
      this.laststage = true;
    }
    else {
      this.laststage = false;
    }
  }

}
