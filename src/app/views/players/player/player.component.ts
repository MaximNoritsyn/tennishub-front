import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  id_db: string = '';

  personForm: FormGroup;

  constructor(private _api: ApiService,
    public fb: FormBuilder,
    public _auth: AuthService,
    public _router: Router,
    private avtiveRoute: ActivatedRoute) {
    this.personForm = this.fb.group({
      id_db: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [''],
      tel: [''],
      birthday: ['', Validators.required],
      sex: ['M'], 
      is_coach: [false]}, 
      {validator: this.emailTelValidator})
  }

  ngOnInit() {
    this.avtiveRoute.params.subscribe((params: Params) => {
      if (params['id_db'] !== 'new') {
        this.id_db = params['id_db'];
      }
      
      if (this.id_db !== '') {
        this._api.getTypeRequestParams('api/player/', { id_db: this.id_db }).subscribe((res: any) => {
          this.personForm.setValue(res);
        });
      }
    });
  }

  savePlayer() {
    this._api.postTypeRequest('api/player', this.personForm.value).subscribe((res: any) => {
      this._router.navigate(['/'])
    }, err => {
      console.log(err)
    });
  }

  emailTelValidator(formGroup: FormGroup): void {

    const email = formGroup.get('email')?.value;
    const tel = formGroup.get('tel')?.value;

    if (email === '' && tel === '') {
      formGroup.get('email')?.setErrors({ required: true });
      formGroup.get('tel')?.setErrors({ required: true });
    }
    else {
      formGroup.get('email')?.setErrors(null);
      formGroup.get('tel')?.setErrors(null);
    }
  }

}
