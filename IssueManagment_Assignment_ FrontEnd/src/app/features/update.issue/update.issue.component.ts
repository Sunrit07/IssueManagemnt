import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../core/models/issue.model';
import { IssueService } from '../../core/services/issue.service';


@Component({
  selector: 'app-update-issue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.issue.component.html',
  styleUrls: ['./update.issue.component.css']
})
export class UpdateIssueComponent implements OnInit {
  issueForm!: FormGroup;
  issueId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private issueService: IssueService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.issueId = this.route.snapshot.paramMap.get('id')!;

    const issue = this.issueService.getIssueById(this.issueId);

    if (!issue) {
      alert(' Issue not found! : (');
      this.router.navigate(['/issues']);
      return;
    }

    this.issueForm = this.fb.group({
      issueId: new FormControl({ value: issue.issueId, disabled: true }),
      title: new FormControl(issue.title, Validators.required),
      description: new FormControl(issue.description, Validators.required),
      severity: new FormControl(issue.severity, Validators.required),

      status: new FormControl(issue.status, Validators.required),
      createdBy: new FormControl(issue.createdBy, Validators.required),
      assignedTo: new FormControl(issue.assignedTo, Validators.required),
      createdAt: new FormControl(issue.createdAt, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const updatedIssue: Issue = {
        ...this.issueForm.getRawValue(),
        issueId: this.issueId
      };

      this.issueService.updateIssue(this.issueId, updatedIssue);
                  alert("Issue updated successfully! : )")

      this.router.navigate(['/issues']);
    } 
  }
}
