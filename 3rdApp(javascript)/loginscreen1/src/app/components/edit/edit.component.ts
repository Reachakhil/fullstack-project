import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productimage;
  imgUrl = "http://localhost:3001/";
  id: String;
  issue: Issue;
  updateForm: FormGroup;
  file;
   response;
   image;
   myform:Issue;

  // tslint:disable-next-line:max-line-length
  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    //this.createForm();
    this.updateForm = this.fb.group({
      name: '',
      age: '',
      address: '',
      gender: '',
      productImage: ''
    });
  }

  // createForm() {
  //   this.updateForm = this.fb.group({
  //     name: ['', Validators.required],
  //     age:'',
  //     address: '',
  //     gender: '',
  //     productImage:String
  //   });
  // }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      this.issueService.getIssuesById(this.id).subscribe((res: any)=>{ 
        // console.log(res.product.productImage);
        this.imgUrl += res.product.productImage;
        console.log(this.imgUrl);
       this.image = res.product.productImage;
        this.updateForm.get('name').setValue(res.product.name);
        this.updateForm.get('age').setValue(res.product.age);
        this.updateForm.get('address').setValue(res.product.address);
        this.updateForm.get('gender').setValue(res.product.gender);
      });
    });
  }
  onFileChanged(event) {
    this.file = event.target.files[0];
    this.productimage = this.file;
  }
  updateIssue() {
    this.myform=this.updateForm.value;
    this.issueService.UpdateIssue(this.id,this.myform.name,this.myform.age,this.myform.address,this.myform.gender,this.productimage).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 2000
      });
    });
  }

}