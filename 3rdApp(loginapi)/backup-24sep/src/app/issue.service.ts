import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
    uri='http://localhost:3001';
  constructor(private http:HttpClient) { }

  getIssues(){
    return this.http.get(`${this.uri}/products`);  //working
      // /products
  }

  getIssuesById(id){
    return this.http.get(`${this.uri}/products/${id}`);   //working (adress not working)
  }

  addIssue(name,age,address,gender,productImage)     //working
  {
    const issue = new FormData();
      issue.append('name',name);
      issue.append('age',age);
      issue.append('address',address);
      issue.append('gender',gender);
      issue.append('productImage',productImage);
      return this.http.post(`${this.uri}/products`,issue); //{this.uri}/products
  }


  UpdateIssue(id,name,age,address,gender,productImage)
  {

    const issue ={
      name:name,
      age:age,
      address:address,
      gender:gender,
      productImage:productImage}

      console.log(productImage);
    // const issue = new FormData();
    // issue.append('name',name);
    // issue.append('age',age);
    // issue.append('address',address);
    // issue.append('gender',gender);
    // issue.append('productImage',productImage);
      return this.http.post(`${this.uri}/products/${id}`,issue);
  }

  DeleteIssue(id){
    return this.http.delete(`${this.uri}/products/${id}`)  //working

  }

  getIssuebyname(name){
    return this.http.get(`${this.uri}/cust/profile/${name}`);  //working

  }






}
