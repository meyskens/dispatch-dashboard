import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../../constants';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles(appid: string) {
    return this.http.get(`${API_ENDPOINT}/dash/app/${appid}/files`).pipe(
      map( response => {  
          // base64 decode
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              response[key].content = atob(response[key].content)
            }
          }

          return response;
      }),
      catchError( error => {
          return Observable.throw(error);
      })
   );
  }

  addFile(appid: string, file: File) {
    const copy = {...file}
    copy.content = btoa(copy.content)
    return this.http.post(`${API_ENDPOINT}/dash/app/${appid}/file`, copy)
  }

  editFile(appid: string, file: File) {
    const copy = {...file}
    copy.content = btoa(file.content)
    return this.http.patch(`${API_ENDPOINT}/dash/app/${appid}/file/${file._id}`, copy)
  }

  deleteFile(appid: string, file: File) {
    return this.http.delete(`${API_ENDPOINT}/dash/app/${appid}/file/${file._id}`)
  }
}

export class File {
  _id: string;
  name: string;
  path: string;
  content: string;
  constructor() { }
}