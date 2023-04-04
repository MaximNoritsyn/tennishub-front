import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-head-test',
  templateUrl: './head-test.component.html',
  styleUrls: ['./head-test.component.css']
})
export class HeadTestComponent implements OnInit {

  id_db: string = '';

  eventForm: FormGroup;
  id_person: string = '';
  person: any = {};
  today: string = '';

  constructor(private _api: ApiService,
    public fb: FormBuilder,
    public _auth: AuthService,
    public _router: Router,
    private _avtiveRoute: ActivatedRoute) {
    this.eventForm = this.fb.group({
      id_db: [''],
      id_person: ['', Validators.required],
      assessor: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required]
    })
  }

  ngOnInit() {
    this._avtiveRoute.params.subscribe((params: Params) => {
      if (params['id_db'] !== 'new') {
        this.id_db = params['id_db'];
      }

      var curdate = new Date();
      this.today = `${curdate.getFullYear()}-${('0' + (curdate.getMonth() + 1)).slice(-2)}-${('0' + curdate.getDate()).slice(-2)}`;

      this.id_person = params['id_person'];

      if (this.id_person !== '') {
        this._api.getTypeRequestParams('api/player/', { id_db: this.id_person }).subscribe((res: any) => {
          this.person = res;

          this.eventForm.patchValue({
            id_person: this.id_person,
            assessor: this._auth.getUserName(),
            date: this.today
          });

        });
      }
    });
  }

  saveEvent() {
    this._api.postTypeRequest('api/test-event/', this.eventForm.value).subscribe((res: any) => {
      if (res['result'] == "ok") {
        this.id_db = res['id_db'];
        this._router.navigate(['/testing/gsd', res.id_db, 1]);
      }
    }
    );

  }

}
