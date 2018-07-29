import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new LoginErrorStateMatcher();

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  login() {
    if (!this.emailFormControl.value || !this.passwordFormControl.value) {
      this.snackBar.open('Needs email and password', 'Close', { duration: 3000 })
      return
    }

    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).catch(error => this.snackBar.open('Login failed', 'Close', { duration: 3000 }))
  }
}
