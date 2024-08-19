import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  UserLoggedIn=new EventEmitter<boolean>();
  currentToken:Token|null=null;

  constructor(private httpClient:HttpClient) { }

  async CreatUser(email:string, password:string){
    let newUser = {
      username:email,
      password:password,
    }
    try{
      let response = await firstValueFrom(this.httpClient.post('http://localhost:3000/api/user/', newUser));
      console.log(response);
      return response;
    } catch(err){
      if(err instanceof HttpErrorResponse){
        console.log(`${err.status}`);
      }
      return false;
    }
  }
  
  async LoginUser(email:string, password:string){
    let authEnc = btoa(`${email}:${password}`);
    let httpHeaders = new HttpHeaders();
    httpHeaders =httpHeaders.set(`Authorization`, `Basic ${authEnc}`);
    try{
      let result = await firstValueFrom(this.httpClient.post<Token>('http://localhost:3000/api/user/login/', null, {headers: httpHeaders}));
      console.log(result);
      localStorage.setItem('token', JSON.stringify(result));
      this.UserLoggedIn.emit(true);
      return result;
    } catch(err){
      if(err instanceof HttpErrorResponse){
        console.log(`${err.status}`);
      }
      return false;
    }
  }
}
