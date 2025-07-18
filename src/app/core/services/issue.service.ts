import { Injectable } from '@angular/core';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor() { }

    private readonly STORAGE_KEY = 'issues';


  addIssue(issue: Issue): void {
    const existingIssues: Issue[] = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    existingIssues.push(issue);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingIssues));
    // alert("issue Created Successfully : )")
  }

 getAllIssues(): Issue[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) as Issue[] : [];
  }


  getIssueById(id: string): Issue | undefined {
  return this.getAllIssues().find(issue => issue.issueId === id);
}
  updateIssue(id: string, updated: Issue): void {
  const issues = this.getAllIssues();
  const index = issues.findIndex(i => i.issueId === id);
  if (index !== -1) {
    issues[index] = updated;
    localStorage.setItem('issues', JSON.stringify(issues));
  }
}

deletIssueById(issueId:string):Issue[]{
    let issueList :Issue[]=JSON.parse(localStorage.getItem('issues') || '[]')

    issueList=issueList.filter(i=>i.issueId!=issueId);
    localStorage.setItem('issues',JSON.stringify(issueList))
    alert("Issue Deleted Sucessfully :)")
    return issueList;
    

  }
}