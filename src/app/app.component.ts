import { Component, NgZone } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CurrentAppService } from './navbar/currentapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentApp = "";

  constructor(private authService: AuthService, private currentAppService: CurrentAppService) {
    currentAppService.currentApp$.subscribe(app => this.currentApp = app)
  }

}
