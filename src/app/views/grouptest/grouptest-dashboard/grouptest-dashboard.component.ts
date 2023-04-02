import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  coach_tests: any = [];
  newplayers: any = [];
  persons: any = [];

  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    public _auth: AuthService,
    public _router: Router,
    private _activeRoute: ActivatedRoute
  ) {
    this.groupForm = this.fb.group({
      id_db: [''],
      assessor: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required],
      searchtext: ['']
    })
  }

  ngOnInit() {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['id_db'] !== 'new') {
        this.mode = 'read';
        this._api.getTypeRequestParams('api/group_test/', { 'id_db': params['id_db'] }).subscribe((data: any) => {
          this.group_test = data;
          this.fillFields(
            data['assessor'],
            data['date'],
            data['id_db'],
            data['venue']
          );
          this.fillCoachTests();
          this.onSearchChange();
        });
      }
      else {
        this.mode = 'new';
        this.prepareFillEmptyFields();
      };
      if (params['task'] !== undefined) {
        this.task = params['task'];
      }
    });
  }

  fillCoachTests() {
    this.coach_tests = [];
    this._api.getTypeRequestParams('api/coach_tests', { 'group_test_id': this.group_test.id_db }).subscribe((data: any) => {
      this.coach_tests = data;
    })
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
  ) {
    this.groupForm.setValue(
      {
        'id_db': id_db,
        'assessor': assessor,
        'date': date_v,
        'venue': venue,
        'searchtext': ''
      });
  }

  onSearchChange(): void {
    var searchtext = this.groupForm.value.searchtext;
    if (searchtext.length < 3) {
      searchtext = '';
    }
    
    this._api.getTypeRequestParams('api/persons', { 'search': searchtext }).subscribe((data: any) => {
      this.persons = data.filter((person: any) => {
        return !this.coach_tests.some((coach_test: any) => {
          return coach_test.test_event.person.id_db === person.id_db;
        });
      });
    });
  }

  useTask(task: string) {
    this.task = task;
  }

  onClickBeginTest(idTest: string) {
    if (this.task === 'gsd') {
      this._router.navigate(['/testing/gsd', this.group_test.id_db, idTest, 1]);
    }
    else if (this.task === 'vd') {
      this._router.navigate(['/testing/vd', this.group_test.id_db, idTest, 1]);
    }
    else if (this.task === 'gsa') {
      this._router.navigate(['/testing/gsa', this.group_test.id_db, idTest, 1]);
    }
    else if (this.task === 'gsa') {
      this._router.navigate(['/testing/serve', this.group_test.id_db, idTest, 1]);
    }
  }

  onClickAddPlayer(person: any) {
    this.persons.splice(this.persons.indexOf(person), 1);
    this.newplayers.push(person);
  }

  saveGroupTest() {
    if (this.mode === 'read') {
      this.mode = 'edit';
      return;
    }

    let playerIds = [];
    for (let player of this.newplayers) {
      playerIds.push(player.id_db);
    }

    const groupTest = {
      id_db: this.groupForm.value.id_db,
      assessor: this.groupForm.value.assessor,
      date: this.groupForm.value.date,
      venue: this.groupForm.value.venue,
      players: playerIds
    };


    this._api.postTypeRequest('api/group_tests', groupTest).subscribe(
      (data: any) => {
        if (data['status'] === 'success' && this.mode === 'new') {
          this._router.navigate(['/grouptestdashboard', data['id_db']]);
        }
        else {
          this.mode = 'read';
          this.newplayers = [];
          this.fillCoachTests()
        }
      });
  }

}
