import { Injectable } from '@angular/core'; 
import { ApiService } from './api.service';
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 

    userInfo: any;
    
    constructor(private _api: ApiService) { 
    } 
 
    getUser(): void {
        this._api.getTypeRequest('api/user').subscribe((res: any) => {
        this.userInfo = res;
        } , err => {
          console.log(err);
        }
    )};

    getUserName(): string {
        if (!this.isLoggedIn()) {
            return '';
        }
        if (!this.userInfo) {
            this.getUser();
        }
        if (this.userInfo) {
            return this.userInfo.person.first_name + ' ' + this.userInfo.person.last_name;
        }
        
        return '';
    }

    isCoach(): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }
        return this.userInfo.person.is_coach;
    }
     
    setDataInLocalStorage(variableName:string, data:string): void { 
        localStorage.setItem(variableName, data); 
    } 
 
    getToken() { 
        return localStorage.getItem('token'); 
    } 
 
    clearStorage(): void { 
        localStorage.clear(); 
    } 

    public isLoggedIn() { 
        return this.getToken() !== null; 
    }
}