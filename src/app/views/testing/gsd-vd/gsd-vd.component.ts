import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TimeoutConfig } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-gsd-vd',
  templateUrl: './gsd-vd.component.html',
  styleUrls: ['./gsd-vd.component.css',
    '../court.css']
})
export class GsdVdComponent implements OnInit {

  stage_number: number = 0;
  forbackhand = false;
  gsd = false;
  vd = false;
  guid: string = '';
  private timeoutId!: ReturnType<typeof setTimeout>;
  test_event: any = {};
  playername: string = '';

  first_bounce: string = '';
  second_bounce: string = '';

  constructor(
    private _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    private _activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this._activeRoute.snapshot.url[1].path === 'gsd' ? this.gsd = true : this.vd = true;

    this._activeRoute.params.subscribe((params: Params) => {
      this.guid = params['idtest'];
      this.stage_number = params['stagenumber'];
      this._api.getTypeRequestParams('api/testevent/', { 'id_db': this.guid }).subscribe((data: any) => {
        this.test_event = data;
        this.playername = this.test_event['person']['first_name'] + ' ' + this.test_event['person']['last_name'];
      });
      var _params = {
        'guid': this.guid,
        'stage_number': this.stage_number,
        'task': this._activeRoute.snapshot.url[1].path
      };
      this._api.getTypeRequestParams('api/detailsserving', _params).subscribe((data: any) => {
        this.first_bounce = data['first_bounce'];
        this.second_bounce = data['second_bounce'];
      });
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
    console.log(this.first_bounce, this.second_bounce);
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
    if (this.gsd) {
      this._api.postTypeRequest('api/testevent/gsd/', {
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

  }

  changeStage() {
    this.first_bounce = '';
    this.second_bounce = '';
    this.stage_number++;
    this._router.navigate([], {
      relativeTo: this._activeRoute,
      queryParams: { stagenumber: this.stage_number },
      queryParamsHandling: 'merge'
    });
    if (this.stage_number === 10) {
      this._router.navigate(['/grouptestdashboard/gsd-vd']);
    }
  }

}
