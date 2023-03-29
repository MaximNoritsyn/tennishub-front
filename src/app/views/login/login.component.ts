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
  
  loginForm: FormGroup; 
  signUpForm: FormGroup;

  public registerMode = false;

  constructor(
    public fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) 
  { 
    this.loginForm = this.fb.group({ 
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    }),
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      sex: ['M'],
      tel: [''],
      email: [''],
      is_coach: [false],},
      {validator: this.mainValidator}
    )
  }

  ngOnInit(): void {}

  mainValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeat_password')?.value;

    const email = formGroup.get('email')?.value;
    const tel = formGroup.get('tel')?.value;

    if (password !== repeatPassword) {
      formGroup.get('repeat_password')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('repeat_password')?.setErrors(null);
    }

    if (email === '' && tel === '') {
      formGroup.get('email')?.setErrors({ required: true });
      formGroup.get('tel')?.setErrors({ required: true });
    }
    else {
      formGroup.get('email')?.setErrors(null);
      formGroup.get('tel')?.setErrors(null);
    }
  }

  login(): void{ 
    let b = this.loginForm.value;
    this._api.postTypeRequest('api/login', b).subscribe((res: any) => { 
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token) 
        this._auth.userInfo = res.user;
        this._router.navigate(['/']) 
      } 
    }, err => { 
      console.log(err) 
    });
  }

  signup(): void{
    let b = this.signUpForm.value;
    this._api.postTypeRequest('api/signup', b).subscribe((res: any) => {
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token);
        this._auth.userInfo = res.user;
        this._router.navigate(['/'])
      }
    }, err => {
      console.log(err)
    });
  }

  registerModeChange(value: boolean): void{
    this.registerMode = value;
  }

}
