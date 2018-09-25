import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
p:number=1;
search1=true;
search2=false;
userFilter:any ={name: ''};
search:String;
base=true;
i;
imgUrl = "http://localhost:3001/";
response;
searchit:string;
  issues: Issue[];

  displayedColumns = ['name', 'age', 'gender', 'status', 'actions'];

  constructor(private authService: AuthService,private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
  
        this.issueService.getIssues().subscribe((res:any)=>{
          console.log(res);
          this.i=res.count;
          this.response=res.products;
          console.log(this.response);

        })


  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    console.log("clicked")
    if (confirm("Are yo sure!")) {
      this.issueService.DeleteIssue(id).subscribe(() => {
        this.fetchIssues();
      });
  }
   
  }
  OnSearch(){
    this.search1=!this.search1;
    this.search2=!this.search2;
    this.searchit=' ';
  }
  OnSearch1(){
    console.log(this.search);
   this.issueService.getIssuebyname(this.search).subscribe((data: Issue[])=>{
    console.log("response=>",data);
    this.issues=data;
     this.base=false;
   });
  
  }
  goback(){
    this.base=true; 
    this.search1=!this.search1;
    this.search2=!this.search2;
    this.fetchIssues();

  }

  logout(){
    console.log('clicked')
    this.authService.removeAuth();
    this.router.navigate(['/login']);
  }

 

}