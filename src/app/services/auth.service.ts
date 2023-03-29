import { Injectable } from '@angular/core'; 
import { ApiService } from './api.service';
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 

    userInfo: any;
    userLoaded: Promise<boolean>;
    
    constructor(private _api: ApiService) { 
        this.userLoaded = new Promise<boolean>((resolve) => {
            if (this.isLoggedIn()) {
              this.getUser().then(() => {
                resolve(true);
              });
            } else {
              resolve(true);
            }
          });
    } 

    async getUser(): Promise<any> {
        if (!this.isLoggedIn()) {
          return;
        }
        try {
          const res = await this._api.getTypeRequestAs('api/user');
          this.userInfo = res;
        } catch (err) {
          console.log(err);
        }
      }

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

    async isCoachAs(): Promise<boolean> {
        await this.userLoaded;
        if (!this.isLoggedIn()) {
          return false;
        }
        if (this.userInfo) {
          return this.userInfo.person.is_coach ? true : false;
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