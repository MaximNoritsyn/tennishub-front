import { Injectable, OnInit } from '@angular/core'; 
import { ApiService } from './api.service';
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService implements OnInit { 

    userInfo: any;
    
    constructor(private _api: ApiService) { 
        
    } 

    ngOnInit(): void {
        if (this.isLoggedIn()) {
            this.getUser();
        }
    }
 
    getUser(): void {
        if (!this.isLoggedIn()) {
            return;
        }
        this._api.getTypeRequest('api/user').subscribe((res: any) => {
            this.userInfo = res;
        } , err => {
            console.log(err);
            this.clearStorage();
        }
    )}

    getUserName(): string {
        if (!this.isLoggedIn()) {
            return '';
        }
        if (this.userInfo) {
            return this.userInfo.person.first_name + ' ' + this.userInfo.person.last_name;
        }

        return '';
        
    }

    getPersonId_Db(): string {
        if (!this.isLoggedIn()) {
            return '';
        }
        if (this.userInfo) {
            return this.userInfo.person.id_db? this.userInfo.person.id_db : '';
        }
        return '';
        
    }

    isCoach(): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }
        if (this.userInfo) {
            return this.userInfo.person.is_coach? true : false;
        }
        return false;
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