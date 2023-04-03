import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.css', '../court.css']
})
export class ServeComponent implements OnInit {

  idgruptest: string = '';
  stage_number: number = 0;
  serve: number = 1;
  guid: string = '';
  testEvent: any = {};
  playername: string = '';

  private timeoutId!: ReturnType<typeof setTimeout>;

  first_bounce: string = '';
  second_bounce: string = '';

  boxWide1: boolean = false;
  boxWide2: boolean = false;
  boxMiddle1: boolean = false;
  boxMiddle2: boolean = false;
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
      this.serve = params['serve'];
      this.idgruptest = params['idgruptest'];
      this.updateTestEvent();
      this.updateBounces();
      this.checkBoxArea();
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
      'task': 'serve',
      'serve': this.serve
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
    var url = 'api/testevent/serve/'
    this._api.postTypeRequest(url, {
      'guid': this.guid,
      'first_bounce': this.first_bounce,
      'second_bounce': this.second_bounce,
      'stage_number': this.stage_number,
      'serve': this.serve
    }).subscribe((data: any) => {
      if (data['result'] === 'ok') {
        this.changeStage();
      }
    });
  }

  changeStage() {

    const availableFirstBounces = ['area_right_middle_service',
      'area_right_wide_service', 'area_left_wide_service',
      'area_left_middle_service']

    if (this.serve == 2 || availableFirstBounces.includes(this.first_bounce)) {
      this.stage_number++;
      this.serve = 1;
    } else {
      this.serve = 2;
    }
    this.first_bounce = '';
    this.second_bounce = '';
    this._router.navigate(['../../', this.stage_number, this.serve], {
      relativeTo: this._activeRoute,
      queryParamsHandling: 'merge'
    });
    this.updateTestEvent();
    this.updateBounces();
    this.checkBoxArea();
    this.setlastStage();
  }

  finishTask() {

    if (this.idgruptest !== '') {
      this._api.postTypeRequest('api/testevent/finishtask/', { "guid_test_event": this.guid, "task": "serve" }).subscribe((data: any) => {
        if (data['result'] === 'ok') {
          this._router.navigate(['/grouptestdashboard/', this.idgruptest, 'serve']);
        }
      });
    } else {
      this._router.navigate(['testing/serve', this.guid, '1']);
    }
  }

  checkBoxArea() {
    if (this.stage_number > 0
      && this.stage_number < 4) {
      this.boxWide1 = true;
      this.boxWide2 = false;
      this.boxMiddle1 = false;
      this.boxMiddle2 = false;
    } else if (this.stage_number > 3
      && this.stage_number < 7) {
      this.boxWide1 = false;
      this.boxWide2 = false;
      this.boxMiddle1 = true;
      this.boxMiddle2 = false;
    } else if (this.stage_number > 6
      && this.stage_number < 10) {
      this.boxWide1 = false;
      this.boxWide2 = false;
      this.boxMiddle1 = false;
      this.boxMiddle2 = true;
    } else if (this.stage_number > 9
      && this.stage_number < 13) {
      this.boxWide1 = false;
      this.boxWide2 = true;
      this.boxMiddle1 = false;
      this.boxMiddle2 = false;
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
