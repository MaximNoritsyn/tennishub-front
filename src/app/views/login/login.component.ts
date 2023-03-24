import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup; 
  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private router: Router
  ) 
  { this.form = this.fb.group({ 
      username: ['', Validators.required], 
      password:['', Validators.required] 
    })
  }

  ngOnInit(): void {}

  login(): void{ 
    let b = this.form.value;
    this._api.postTypeRequest('api/login', b).subscribe((res: any) => { 
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token) 
        this.router.navigate(['/']) 
      } 
    }, err => { 
      console.log(err) 
    });
  }

}
