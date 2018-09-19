import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  constructor(private http: HttpClient) { }


  login(loginData){
    console.log(loginData);
    return this.http.post(`http://localhost:3009/api/login`,loginData);
   
  }
}
