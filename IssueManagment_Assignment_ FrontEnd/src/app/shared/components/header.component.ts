import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  title:string="ISSUE MANAGEMENT"
  isLoggedIn:boolean=false;
  /**
   *
   */
  constructor(private router:Router,private authService:AuthService) {
   
    
  }
  ngOnInit(): void {
    const user =localStorage.getItem('loggedInUser');
    console.log(user);
    if(user)
    {
      this.isLoggedIn = true;
    }
    else
    {
      this.isLoggedIn = false;
    }
  }
  logout(): void {
  this.authService.logout(); // perform logout (likely clears tokens/localStorage)
  this.isLoggedIn = false;   // update UI accordingly
  this.router.navigate(['/login']);
}
  // logout(): void {
  //   this.authService.logout();
  //   if(this.authService.logout())
  //   {
  //     this.isLoggedIn = true;
  //   }else{
  //     this.ngOnInit();
  //     this.isLoggedIn = false;
  //     console.error('Logout failed');
  //   }
  //   this.router.navigate(['/login']);


  // }
  
export class HeaderComponent {

  title:string="ISSUE MANAGEMENT"
  console.log("Header Component Loaded");


}
