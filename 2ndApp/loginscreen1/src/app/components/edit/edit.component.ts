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

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      age:'',
      address: '',
      gender: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(params.id);
      this.issueService.getIssuesById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('name').setValue(this.issue.name);
        this.updateForm.get('age').setValue(this.issue.age);
        this.updateForm.get('address').setValue(this.issue.address);
        this.updateForm.get('gender').setValue(this.issue.gender);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(name, age, address, gender) {
    this.issueService.UpdateIssue(this.id, name, age, address, gender).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}