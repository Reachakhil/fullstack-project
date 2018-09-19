import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Issue} from '../../issue.model';

import {Router} from '@angular/router';
import { IssueService} from '../../issue.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm:FormGroup;
  genders=['male','female'];
  name:string;
  age:string;
  address:string;
  gender:String;
  myform:Issue;
 
  constructor(private issueService: IssueService,private fb:FormBuilder,private router:Router) {
    this.createForm=this.fb.group({
      name:['',[Validators.required,Validators.maxLength(15)]],
      age:['',[Validators.pattern('^0*(?:[1-9][0-9]?|125)$'),Validators.required]],
      address: '',
      gender:''
    });
   }

   addIssue(){
    this.myform=this.createForm.value;
    console.log(this.myform.name,this.myform.age,this.myform.address,this.myform.gender);
       

     this.issueService.addIssue(this.myform.name,this.myform.age,this.myform.address,this.myform.gender).subscribe(()=>{
       this.router.navigate(['/list']);
     }
    )
   }

  ngOnInit() {
  
  }

  show(){
    console.log(this.createForm.value);
  }
}

