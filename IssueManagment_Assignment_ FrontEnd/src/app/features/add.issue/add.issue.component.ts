import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Issue } from '../../core/models/issue.model'; 
import { IssueService } from '../../core/services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.issue.component.html',
  styleUrls: ['./add.issue.component.css']
})
export class AddIssueComponent implements OnInit {

  issueForm!: FormGroup<{
    issueId: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    severity: FormControl<Issue['severity']>;

    status: FormControl<Issue['status']>;
    createdBy: FormControl<string>;
    assignedTo: FormControl<string>;
    createdAt: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder,private issueService:IssueService,private router:Router) {}

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      issueId: this.fb.control({ value: uuidv4(), disabled: true }, { nonNullable: true }),
      title: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      description: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
severity: this.fb.control<'minor' | 'critical' | 'major'>('minor', { validators: [Validators.required], nonNullable: true }),

status: this.fb.control<'open' | 'in-progress' | 'closed'>({value:'open', disabled: true },{ validators: [Validators.required], nonNullable: true }),
      createdBy: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      assignedTo: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      createdAt: this.fb.control({ value: new Date().toISOString(), disabled: true }, { nonNullable: true })
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const issue: Issue = this.issueForm.getRawValue() as Issue;

            this.issueService.addIssue(issue)
            alert("Issue Added Sucessfully :)")

            this.router.navigate(['issues'])


          } }
}
