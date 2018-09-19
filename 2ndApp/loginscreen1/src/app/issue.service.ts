import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
    uri='http://localhost:3009';
  constructor(private http:HttpClient) { }

  getIssues(){
    return this.http.get(`${this.uri}/cust/list`);  //working
  }

  getIssuesById(id){
    return this.http.get(`${this.uri}/cust/${id}`);   //working (adress not working)
  }

  addIssue(name,age,address,gender)     //working
  {
    const issue ={
      name:name,
      age:age,
     address:address,
      gender:gender
    };
      return this.http.post(`${this.uri}/cust/add`,issue);
  }


  UpdateIssue(id,name,age,address,gender)
  {
    const issue ={
      name:name,
      age:age,
      address:address,
      gender:gender,
    };
      return this.http.post(`${this.uri}/cust/update/${id}`,issue);

  }

  DeleteIssue(id){
    return this.http.get(`${this.uri}/cust/delete/${id}`)  //working

  }

  getIssuebyname(name){
    return this.http.get(`${this.uri}/cust/profile/${name}`);  //working

  }






}
