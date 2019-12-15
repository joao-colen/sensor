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

    editSensor(id: string, body: any): Observable<any> {
      const url = this.baseUrl + '/sensors/update/' + id; 
      return this.http.put(url, body)
        .pipe(
          catchError(this.errorHandler)
        );
    }

    addSensor(body: any): Observable<any> {
      const url = this.baseUrl + '/sensors/add';
      return this.http.post(url, body)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    deleteSensor(id: string): Observable<any> {
      const url = this.baseUrl + '/sensors/remove/' + id;
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