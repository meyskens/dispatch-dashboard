import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentAppService {

  private currentApp = new Subject<string>();
  public currentApp$ = this.currentApp.asObservable();

  constructor() { }

  public setCurrentApp(app: string) {
    this.currentApp.next(app);
  }
}
