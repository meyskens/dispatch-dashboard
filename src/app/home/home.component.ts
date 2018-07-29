import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth/auth.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.isAuthenticated)
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/dash') 
    }
  }

}
