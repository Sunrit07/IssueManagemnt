import { Routes } from '@angular/router';
import { IssueListComponent } from './features/issue.list/issue.list.component';
import { UpdateIssueComponent } from './features/update.issue/update.issue.component';
import { AddIssueComponent } from './features/add.issue/add.issue.component';
import { IssueDetailsComponent } from './features/issue-details/issue-details.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  {path:'',redirectTo:'issues',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},


  { path: 'issues', component: IssueListComponent },
{ path: 'update.issue/:id', component: UpdateIssueComponent },
{ path: 'add.issue', component: AddIssueComponent },
{
  path:'issue-details',component:IssueDetailsComponent
}

];
