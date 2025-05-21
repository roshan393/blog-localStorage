import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  

  router=inject(Router)
  onLogout(){
    const signUpData= localStorage.getItem('user')
    if(signUpData !== null){
      localStorage.removeItem('user')
    }
    this.router.navigate(['/login'])
    alert('Logout Successfully');
  }
}
