import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Issue } from '../../core/models/issue.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../core/services/issue.service';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent {
  @Input() issue?:Issue;
  // @Output() deleteIssue: new EventEmitter<string>;
  @Output() deleteIssue: EventEmitter<string> = new EventEmitter<string>();
  @Output() showLess:EventEmitter<string>=new EventEmitter<string>();

  
  constructor(private router:Router,private issueService:IssueService) {
  
    
  }

  onChangeStatus(issueId: string): void {
    this.router.navigate(['/update.issue', issueId]);
  }

  deletIssueById(issueId:string):void{
    
    this.deleteIssue.emit(this.issue?.issueId);
    // this.issues=   this.issueService.deletIssueById(issueId);
    

  }
  closeExpansion(issueId:string)
  {
    this.showLess.emit(this.issue?.issueId);
  }

}
