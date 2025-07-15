export interface  Issue{
     issueId: string;
  title: string;
  description: string;
  severity:'critical' | 'minor' | 'major';
  status: 'open' | 'in-progress' | 'closed';
  createdBy:string;
  assignedTo:string;
  createdAt: string;

}