import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  
  baseUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

    // Get homes
    getSensors(): Observable<any> {
      const url = this.baseUrl + '/sensors';
      console.log(url);
      return this.http.get(url)
        .pipe(
          catchError(this.errorHandler)
        );
    }

    getSensor(id: string): Observable<any> {
      const url = this.baseUrl + '/sensors/' + id;
      return this.http.get(url)
        .pipe(
          catchError(this.errorHandler)
        );
    }

    // Error handling
    errorHandler(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}