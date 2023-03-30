import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-grouptest-dashboard',
  templateUrl: './grouptest-dashboard.component.html',
  styleUrls: ['./grouptest-dashboard.component.css']
})
export class GrouptestDashboardComponent implements OnInit {

  mode: string = 'new';
  task: string = 'gsd';

  groupForm: FormGroup;

  group_test: any = {};
  players: any = [];

  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    private _avtiveRoute: ActivatedRoute
  ) {
    this.groupForm = this.fb.group({
      id_db: [''],
      assessor: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required],
      players: this.fb.array([])
    })
  }

  ngOnInit() {
    this._avtiveRoute.params.subscribe((params: Params) => {
      if (params['id_db'] !== 'new') {
        this.mode = 'read';
        this._api.getTypeRequestParams('api/group_test/', {'id_db': params['id_db']}).subscribe((data: any) => {
          console.log('data', data);
          this.group_test = data;
          this.fillFields(
            data['assessor'],
            data['date'],
            data['id_db'],
            data['venue']
          );
        });
      }
      else {
        this.mode = 'new';
        this.prepareFillEmptyFields();
      }
    });
  }

  async prepareFillEmptyFields() {
    var curdate = new Date();
    const formattedDate = `${curdate.getFullYear()}-${('0' + (curdate.getMonth() + 1)).slice(-2)}-${('0' + curdate.getDate()).slice(-2)}`;
    var assessor = '';
    if (await this._auth.isCoachAs()) {
      assessor = this._auth.getUserName()
      this.fillFields(assessor, formattedDate);
    }
    else {
      this.fillFields(assessor, formattedDate);
    }
  }

  async fillFields(
    assessor: string,
    date_v: string,
    id_db: string = '',
    venue: string = '',
    players: any = []
    ) 
    {
    this.groupForm.setValue(
      {
        'id_db': id_db,
        'assessor': assessor,
        'date': date_v,
        'venue': venue,
        "players": players
      });
  }


useTask(task: string) {
  this.task = task;
}

onClickBeginTest(idPlayer: string) {
  console.log('onClickBeginTest', idPlayer);
}

saveGroupTest() {
  var data = this.groupForm.value;
  this.fillFields(
    data['assessor'],
    data['date'],
    data['id_db'],
    data['venue'],
    this.players
  );
  console.log('saveGroupTest', this.groupForm.value);
  console.log("this.mode", this.mode)
  this._api.postTypeRequest('api/group_tests', this.groupForm.value).subscribe(
    (data: any) => {
      console.log('saveGroupTest', data);
      if (data['status'] === 'success' && this.mode==='new') {
        this._router.navigate(['/grouptestdashboard', data['id_db']]);
      }
      else {
        this.mode = 'read';
      }
    });
}

}
