import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { aportes } from '../aportes';
import { Chart } from '../chart';

/* const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}; */

const apiUrl = `http://localhost:3000/api/`;  //aportes-->

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getaportes(): Observable<aportes[]> {
    return this.http.get<aportes[]>(`${apiUrl}`)
      .pipe(
        tap(aportes => console.log('fetched aportes')),
        catchError(this.handleError('getaportes', []))
      );
  }

  getaportesById(id: string): Observable<aportes> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<aportes>(url).pipe(
      tap(_ => console.log(`fetched aportes id=${id}`)),
      catchError(this.handleError<aportes>(`getaportesById id=${id}`))
    );
  }


  getChart(): Observable<Chart> {
    const url = `${apiUrl}aportes`;
    return this.http.get<Chart>(url).pipe(
      tap(_ => console.log(`fetched chart data`)),
      catchError(this.handleError<Chart>(`getChart data`))
    );
  }

  getbarChart(): Observable<Chart> {
    const url = `${apiUrl}aportes`;
    return this.http.get<Chart>(url).pipe(
      tap(_ => console.log(`getbarChart`)),
      catchError(this.handleError<Chart>(`getChart data`))
    );
  }



}
