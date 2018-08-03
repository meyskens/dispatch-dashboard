import { Component, OnInit, Input } from '@angular/core';
import { AppDetails } from '../appdetails.service';
import { FilesService, File } from './files.service';
import { FormControl, FormGroupDirective, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import pull from "lodash.pull"

export class FileErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-appdetails-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class AppDetailsFilesComponent implements OnInit {

  matcher = new FileErrorStateMatcher();

  private _app: AppDetails;
  private files: File[];

  constructor(private service: FilesService, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  @Input()
  set app(app: AppDetails) {
    this._app = app;
    this.load()
  }

  load() {
    this.service.getFiles(this._app._id).subscribe((res: File[]) => this.files = res)
  }

  add() {
    const file = new File()
    file.name = "New File"
    file.content = ""
    file.path = ""
    this.files.push(file)
  }

  save(file: File) {
    if (!file._id) {
      this.service.addFile(this._app._id, file).subscribe((res: File) => {
        file._id = res._id
        this.snackBar.open('File saved', 'Close', { duration: 3000 })
      }, err => this.snackBar.open('Failed to save', 'Close', { duration: 3000 }))
    } else {
      this.service.editFile(this._app._id, file).subscribe(res => this.snackBar.open('File saved', 'Close', { duration: 3000 }), err => this.snackBar.open('Failed to save', 'Close', { duration: 3000 }))
    }
  }

  delete(file: File) {
    if (!file._id) {
      pull(this.files, file)
      return
    }
    this.service.deleteFile(this._app._id, file).subscribe(res => pull(this.files, file))
  }
}
