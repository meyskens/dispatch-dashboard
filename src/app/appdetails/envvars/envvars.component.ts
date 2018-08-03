import { Component, OnInit, Input } from '@angular/core';
import { AppDetails } from '../appdetails.service';
import { EnvVarsService, EnvVar } from './envvars.service';
import { FormControl, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import pull from "lodash.pull"

export class EnvVarsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-appdetails-envvars',
  templateUrl: './envvars.component.html',
  styleUrls: ['./envvars.component.css']
})
export class AppDetailsEnvVarsComponent implements OnInit {

  matcher = new EnvVarsErrorStateMatcher();

  private _app: AppDetails;
  private envvars: EnvVar[];

  constructor(private service: EnvVarsService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
    this.load()
  }

  load() {
    this.service.getEnvVar(this._app._id).subscribe((res: EnvVar[]) => this.envvars = res)
  }

  add() {
    const envvar = new EnvVar()
    envvar.name = "New Environment Variable"
    envvar.hide = true
    this.envvars.push(envvar)
  }

  save(envvar: EnvVar) {
    if (!envvar._id) {
      this.service.addEnvVar(this._app._id, envvar).subscribe((res: EnvVar) => {
        envvar._id = res._id
        this.snackBar.open('Environment variable saved', 'Close', { duration: 3000 })
      }, err => this.snackBar.open('Failed to save', 'Close', { duration: 3000 }))
    } else {
      this.service.editEnvVar(this._app._id, envvar).subscribe(res => this.snackBar.open('Environment variable saved', 'Close', { duration: 3000 }), err => this.snackBar.open('Failed to save', 'Close', { duration: 3000 }))
    }
  }

  delete(envvar: EnvVar) {
    if (!envvar._id) {
      pull(this.envvars, envvar)
      return
    }
    this.service.deleteEnvVar(this._app._id, envvar).subscribe(res => pull(this.envvars, envvar))
  }
}
