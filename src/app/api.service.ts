import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api ='api/search/documentSearch?'

  constructor( private http:HttpClient) { }



  postData(payload:any, start:any, size:any ): Observable<any> {
    return this.http.post(this.api,payload,  {
      params: {
        start: start,
        size: size
      }});
  }


  checkApiHealth(): Observable<any> {
    return this.http.get('https://mevendtrk-svc-np.maverick.aa.com/vdt/actuator/health').pipe(
      catchError(error => {
        return of({ status: 'down', error });
      })
    );
  }
}
