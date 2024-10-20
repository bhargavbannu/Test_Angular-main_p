import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api ='api/search/documentSearch?'

  private routesAPi="api/search/routeSearch?"

  private auditsApi = 'api/search/auditSearch?'

  private manageAuditStatusesApi = 'api/adminConfiguration/manageAuditStatuses'

  private manageDetailDocTypesApi = 'api/adminConfiguration/manageDetailDocTypes'

  private manageEffectivitiesApi = 'api/adminConfiguration/manageEffectivities'

  private manageEccnNumbersApi = 'api/adminConfiguration/manageEccnNumbers'

  private manageEccnLocationsApi = 'api/adminConfiguration/manageEccnLocations'

  private documentCategoriesApi = 'api/adminConfiguration/documentCategories'

  private manageSectionsApi = 'api/adminConfiguration/manageSections'

  constructor( private http:HttpClient) { }



  postData(payload:any, start:any, size:any ): Observable<any> {
    return this.http.post(this.api,payload,  {
      params: {
        start: start,
        size: size
      }});   
  }

  routesData(payload:any, start:any, size:any):Observable<any>{
    return this.http.post(this.routesAPi,payload, {
      params: {
        start: start,
        size: size
      }});
  }

  auditsData(payload:any, start:any, size:any):Observable<any>{
    return this.http.post(this.auditsApi,payload, {
      params: {
        start: start,
        size: size
      }});
  }

  getAuditStatuses():Observable<any>{
    return this.http.get<any>(this.manageAuditStatusesApi)
  }

  getDocTypes():Observable<any>{
    return this.http.get<any>(this.manageDetailDocTypesApi)
  }

  getEffectivites():Observable<any>{
    return this.http.get<any>(this.manageEffectivitiesApi)
  }

  getEccnNumbers():Observable<any>{
    return this.http.get<any>(this.manageEccnNumbersApi)
  }

  getEccnLocations():Observable<any>{
    return this.http.get<any>(this.manageEccnLocationsApi)
  }

  getDocCategories():Observable<any>{
    return this.http.get<any>(this.documentCategoriesApi)
  }

  getSections():Observable<any>{
    return this.http.get<any>(this.manageSectionsApi)
  }

  // updateAuditStatuses(statusCode:string, description:string):Observable<any>{
  //   return this.http.post<any>(`${this.manageAuditStatusesApi}/update`,{statusCode, description})
  // }


  checkApiHealth(): Observable<any> {
    return this.http.get('https://mevendtrk-svc-np.maverick.aa.com/vdt/actuator/health').pipe(
      catchError(error => {
        return of({ status: 'down', error });
      })
    );
  }
}
