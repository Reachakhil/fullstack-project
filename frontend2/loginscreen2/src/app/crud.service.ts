import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  public addData(data){
    const httpOptions={
      headers: new HttpHeaders({'content-Type': 'application/json'})
    };
    return this.http.post("http://localhost:3009/cust/add",{"data":data},httpOptions);
  }
  public readData(name){
    return this.http.get(`http://localhost:3009/cust/profile/${name}`);

  }
  public readdataall(){
    return this.http.get("http://localhost:3009/cust/list");
  }

  public onDelete(name){
    return this.http.delete(`http://localhost:3009/cust/delete/${name}`);
  }
  public updatedata(name, data){
    const httpOptions={
      headers:new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.put(`http://localhost:3009/cust/update/${name}`, {"data":data}, httpOptions);

  }
}
