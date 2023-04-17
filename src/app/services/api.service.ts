import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
import { firstValueFrom } from 'rxjs';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ApiService { 
 
 
  private REST_API_SERVER = "http://tenni-loadb-142yyztylylj0-726f5a50ceb2c252.elb.eu-west-1.amazonaws.com:8000/";
  constructor(private httpClient: HttpClient) { } 
 
  getTypeRequestParams(url: string, params?: {[key: string]: any}) { 
    return this.httpClient.get(this.REST_API_SERVER+url, { params }).pipe(map(res => { 
      return res; 
    })); 
  } 

  getTypeRequest(url: string) { 
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => { 
      return res; 
    })); 
  } 

  async getTypeRequestAs(url: string): Promise<any> {
    const observable$ = this.httpClient.get(this.REST_API_SERVER+url);
    const promise$ = await firstValueFrom(observable$);
    return promise$;
  }
 
  postTypeRequest(url: string, payload: any) { 
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  putTypeRequest(url: string, payload: any) { 
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })) 
  }   
}