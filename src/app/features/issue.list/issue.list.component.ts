


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IssueService } from '../../core/services/issue.service';
import { Issue } from '../../core/models/issue.model'
import { FormsModule } from '@angular/forms';
import { IssueDetailsComponent } from '../issue-details/issue-details.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,IssueDetailsComponent],
  templateUrl: './issue.list.component.html',
  styleUrls: ['./issue.list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  filterBy:string=""
  filteredIssues:Issue[]=[]
  selectedIssue?:Issue;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.issues = this.issueService.getAllIssues();
  }

  
  getFilterdIssues():Issue[]
  {
    if(this.filterBy.trim()=="" || !this.filterBy)
    {
      return this.issues;
    }
    return this.issues.filter(i=>

    i.title.toLocaleLowerCase().includes(this.filterBy.toLocaleLowerCase()) ||i.status.toLocaleLowerCase().includes(this.filterBy.toLocaleLowerCase()) )

  }
  onChangeStatus(issueId: string): void {
    this.router.navigate(['/update.issue', issueId]);
  }

  deletIssueById(issueId:string):void{
    
    this.issues=   this.issueService.deletIssueById(issueId);
    
    

  }

  showDetails(selectedIssue:Issue)
  {
    this.selectedIssue=selectedIssue;
    // this.router.navigate(['/issue-details'])
  }
  showLessDetails(issueId:string):void
  {
    this.selectedIssue=undefined;
    

  }

}
