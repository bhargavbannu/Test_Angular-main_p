import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'api/search/documentSearch?';
  private routesAPi = 'api/search/routeSearch?';
  private auditsApi = 'api/search/auditSearch?';
  private manageAuditStatusesApi = 'api/adminConfiguration/manageAuditStatuses';
  private manageDetailDocTypesApi ='api/adminConfiguration/manageDetailDocTypes';
  private manageEffectivitiesApi = 'api/adminConfiguration/manageEffectivities';
  private manageEccnNumbersApi = 'api/adminConfiguration/manageEccnNumbers';
  private manageEccnLocationsApi = 'api/adminConfiguration/manageEccnLocations';
  private documentCategoriesApi = 'api/adminConfiguration/documentCategories';
  private manageSectionsApi = 'api/adminConfiguration/manageSections';
  private addDocumentApi = 'api/addDocument/saveDocument';
  private saveManageSectionsApi = 'api/adminConfiguration/saveNewSection';
  private updateManageSectionsApi = 'api/adminConfiguration/editSection';
  private deleteManageSectionsApi = 'api/adminConfiguration/deleteSection';
  private saveDocumentCategoryApi = 'api/adminConfiguration/saveNewDocumentCategory';
  private saveDocumentCategoryUpdateApi = 'api/adminConfiguration/updateDocumentCategory';
  private deleteDocumentCategoryApi = 'api/adminConfiguration/deleteDocumentCategory';
  private saveAuditStatusApi = 'api/adminConfiguration/saveAuditStatus';
  private deleteAuditStatusApi = 'api/adminConfiguration/deleteAuditStatus';
  private saveDetailDocTypeApi = 'api/adminConfiguration/saveDetailDocType';
  private deleteDetailDocTypeApi = 'api/adminConfiguration/deleteDetailDocType';
  private saveEffectivityApi = 'api/adminConfiguration/saveNewEffectivity';
  private deleteEffectivityApi = 'api/adminConfiguration/deleteEffectivity';
  private saveEccnNumberApi = 'api/adminConfiguration/saveEccnNumber';
  private deleteEccnNumberApi = 'api/adminConfiguration/deleteEccnNumber';
  private saveEccnLocationApi = 'api/adminConfiguration/saveEccnLocation';
  private deleteEccnLocationApi = 'api/adminConfiguration/deleteEccnLocation';
  private viewSearchApi = 'api/addDocument/viewDocument';
  private viewAuditApi = 'api/audit/viewAudit';
  private viewAllAuditsApi = 'api/audit/viewAllAudits';
  private eccNumberApi='api/adminConfiguration/getEccnNumbers';
  private eccLocation= 'api/adminConfiguration/getEccnLocations';
  private docType = 'api/adminConfiguration/getAuditableDetailDocTypes'

  viewDocId: any;
  viewAuditId: any;

  private formData: any;

  constructor(private http: HttpClient) {}

  saveFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

 
  postData(payload: any, start: any, size: any): Observable<any> {
    return this.http.post(this.api, payload, {
      params: {
        start: start,
        size: size,
      },
    });
  }

  routesData(payload: any, start: any, size: any): Observable<any> {
    return this.http.post(this.routesAPi, payload, {
      params: {
        start: start,
        size: size,
      },
    });
  }

  auditsData(payload: any, start: any, size: any): Observable<any> {
    return this.http.post(this.auditsApi, payload, {
      params: {
        start: start,
        size: size,
      },
    });
  }

 

  addDocument(payload: any): Observable<any> {
    return this.http.post<any>(this.addDocumentApi, payload);
  }

  getAuditStatuses(): Observable<any> {
    return this.http.get<any>(this.manageAuditStatusesApi);
  }

  getDocTypes(): Observable<any> {
    return this.http.get<any>(this.manageDetailDocTypesApi);
  }

  getEffectivites(): Observable<any> {
    return this.http.get<any>(this.manageEffectivitiesApi);
  }

  getEccnNumbers(): Observable<any> {
    return this.http.get<any>(this.manageEccnNumbersApi);
  }

  getEccnLocations(): Observable<any> {
    return this.http.get<any>(this.manageEccnLocationsApi);
  }

  getDocCategories(): Observable<any> {
    return this.http.get<any>(this.documentCategoriesApi);
  }

  getSections(): Observable<any> {
    return this.http.get<any>(this.manageSectionsApi);
  }

  viewDocuments(): Observable<any> {
    return this.http.get<any>(
      `${this.viewSearchApi}?documentNbr=${this.viewDocId}`
    );
  }

  viewAudit(): Observable<any> {
    return this.http.get<any>(
      `${this.viewAuditApi}?auditId=${this.viewAuditId}`
    );
  }

  // eccnNumber(id:any):Observable<any>{
  //   return this.http.get<any>(
  //     `${this.eccNumberApi}?sourceElement=${id}`
  //   )
  // }
  // eccnLocation(id:any):Observable<any>{
  //   return this.http.get<any>(`${this.eccLocation}?sourceElement=${id}`)
  // }

  eccnNumber():Observable<any>{
    return this.http.get<any>(
      `${this.eccNumberApi}?sourceElement=`
    )
  }
  eccnLocation():Observable<any>{
    return this.http.get<any>(`${this.eccLocation}?sourceElement=`)
  }
  audDocType():Observable<any>{
    return this.http.get<any>(`${this.docType}?sourceElement=`)
  }

  // audDocType(id:any):Observable<any>{
  //   return this.http.get<any>(`${this.docType}?sourceElement=${id}`)
  // }

  viewAllAudits(): Observable<any> {
    return this.http.get<any>(
      `${this.viewAllAuditsApi}?documentNbr=${this.viewDocId}`
    );
  }

  updateManageSections(
    section: any,
    description: string,
    inactiveInd: any,
    inactiveDate: any
  ): Observable<any> {
    return this.http.post<any>(this.saveManageSectionsApi, {
      // editId: section,
      section,
      description,
      inactiveInd,
      inactiveDate,
    });
  }

  updateManageSections1(
    section: any,
    description: string,
    inactiveInd: any,
    
  ): Observable<any> {
    return this.http.put<any>(`${this.updateManageSectionsApi}/${section}`, {
      // editId: section,

      description,
      inactiveInd,
    });
  }

  deleteManageSections(section: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteManageSectionsApi}/${section}`);
  }

  saveDocumentCategory(
    documentCatgCd: any,
    documentCatgDesc: string
  ): Observable<any> {
    return this.http.post<any>(this.saveDocumentCategoryApi, {
      documentCatgCd,
      documentCatgDesc,
    });
  }

  saveDocumentCategoryUpdate(
    documentCatgCd: any,
    documentCatgDesc: string
  ): Observable<any> {
    return this.http.put<any>(`${this.saveDocumentCategoryUpdateApi}/${documentCatgCd}`, {
      documentCatgDesc,
    });
  }

  deleteDocumentCategory(documentCatgCd: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteDocumentCategoryApi}/${documentCatgCd}`
    );
  }

  saveAuditStatus(
    auditStatusCd: any,
    auditStatusDesc: string
  ): Observable<any> {
    return this.http.post<any>(this.saveAuditStatusApi, {
      editId: "-1",
      auditStatusCd,
      auditStatusDesc,
    });
  }

  deleteAuditStatus(auditStatusCd: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteAuditStatusApi}/${auditStatusCd}`
    );
  }

  saveDetailDocType(
    detailDocType: any,
    detailDocTypeDesc: string,
    auditableInd: any
  ): Observable<any> {
    return this.http.post<any>(this.saveDetailDocTypeApi, {
      editId: "-1",
      detailDocType,
      detailDocTypeDesc,
      auditableInd,
    });
  }

  deleteDetailDocType(detailDocType: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteDetailDocTypeApi}/${detailDocType}`
    );
  }

  saveEffectivity(
    effectivityId: any,
    esoMinSeqNbr: string,
    esoMaxSeqNbr: string,
    esoCurrSeqNbr: any,
    inactiveInd: any
  ): Observable<any> {
    return this.http.post<any>(this.saveEffectivityApi, {
      editId: "-1",
      effectivityId,
      effectivityFleet: { esoMinSeqNbr, esoMaxSeqNbr, esoCurrSeqNbr },
      inactiveInd,
    });
  }

  deleteEffectivity(effectivityId: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteEffectivityApi}/${effectivityId}`
    );
  }

  saveEccnNumber(eccnNumber: any): Observable<any> {
    return this.http.post<any>(this.saveEccnNumberApi, {editId: "-1", eccnNumber });
  }

  deleteEccnNumber(eccnNumber: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteEccnNumberApi}/${eccnNumber}`);
  }

  saveEccnLocation(
    eccnLocationCd: any,
    eccnLocationDesc: string
  ): Observable<any> {
    return this.http.post<any>(this.saveEccnLocationApi, {
      editId: "-1",
      eccnLocationCd,
      eccnLocationDesc,
    });
  }

  deleteEccnLocation(eccnLocationCd: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteEccnLocationApi}/${eccnLocationCd}`
    );
  }

  checkApiHealth(): Observable<any> {
    return this.http
      .get('https://mevendtrk-svc-np.maverick.aa.com/vdt/actuator/health')
      .pipe(
        catchError((error) => {
          return of({ status: 'down', error });
        })
      );
  }
}
