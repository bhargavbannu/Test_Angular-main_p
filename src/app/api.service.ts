import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'api/search/documentSearch?';
  private routesAPi = 'api/search/routeSearch?';
  private auditsApi = 'api/search/auditSearch?';
  private manageAuditStatusesApi = 'api/adminConfiguration/manageAuditStatuses';
  private manageDetailDocTypesApi =
    'api/adminConfiguration/manageDetailDocTypes';
    private ecoNumbersValues = 'api/eco/getECOs?sourceElement';
    private esoNumbersApi = 'api/eso/getESOs?sourceElement';
    private auditableDocApi = 'api/adminConfiguration/getAuditableDetailDocTypes?sourceElement'

  private manageEffectivitiesApi = 'api/adminConfiguration/manageEffectivities';
  private manageEccnNumbersApi = 'api/adminConfiguration/manageEccnNumbers';
  private manageEccnLocationsApi = 'api/adminConfiguration/manageEccnLocations';
  private documentCategoriesApi = 'api/adminConfiguration/documentCategories';
  private manageSectionsApi = 'api/adminConfiguration/manageSections';
  private addDocumentApi = 'api/addDocument/saveDocument';
  private saveManageSectionsApi = 'api/adminConfiguration/saveNewSection';
  private updateManageSectionsApi = 'api/adminConfiguration/editSection';
  private deleteManageSectionsApi = 'api/adminConfiguration/deleteSection';
  private saveDocumentCategoryApi =
    'api/adminConfiguration/saveNewDocumentCategory';
  private saveDocumentCategoryUpdateApi =
    'api/adminConfiguration/updateDocumentCategory';
  private deleteDocumentCategoryApi =
    'api/adminConfiguration/deleteDocumentCategory';
  private saveAuditStatusApi = 'api/adminConfiguration/saveNewAuditStatus';
  private updateAuditStatusApi = 'api/adminConfiguration/editAuditStatus';
  private deleteAuditStatusApi = 'api/adminConfiguration/deleteAuditStatus';
  private saveDetailDocTypeApi = 'api/adminConfiguration/saveNewDetailDocType';
  private updateDetailDoc = 'api/adminConfiguration/updateDetailDocType';
  private deleteDetailDocTypeApi = 'api/adminConfiguration/deleteDetailDocType';
  private saveEffectivityApi = 'api/adminConfiguration/saveNewEffectivity';
  private deleteEffectivityApi = 'api/adminConfiguration/deleteEffectivity';
  private saveEccnNumberApi = 'api/adminConfiguration/saveNewEccnNumber';
  private updateEccnNumberApi = 'api/adminConfiguration/updateEccnNumber';
  private deleteEccnNumberApi = 'api/adminConfiguration/deleteEccnNumber';
  private updateEccnLoaction = 'api/adminConfiguration/updateEccnLocation';
  private saveEccnLocationApi = 'api/adminConfiguration/saveNewEccnLocation';
  private deleteEccnLocationApi = 'api/adminConfiguration/deleteEccnLocation';
  private viewSearchApi = 'api/addDocument/viewDocument';
  private viewAuditApi = 'api/audit/viewAudit';
  private viewAllAuditsApi = 'api/audit/viewAllAudits';
  private eccNumberApi = 'api/adminConfiguration/getEccnNumbers';
  private eccLocation = 'api/adminConfiguration/getEccnLocations';
  private docType = 'api/adminConfiguration/getAuditableDetailDocTypes';
  private manageVendoeAutoPopulate = 'api/adminConfiguration/getVendors';
  private saveVendors = 'api/adminConfiguration/saveVendor';
  private saveNewDetailApi = 'api/detail/saveNewDetail';
  private viewDetailApi = 'api/detail/viewDetail'
  private saveEditDetailApi = 'api/detail/saveDetail'
  private deleteDetailApi = 'api/detail/deleteDetail'
  private saveFormerVendorApi ='api/formerVendor/createSupercededVendorDetails'
  private deleteFormerVendorApi ='api/formerVendor/deleteFormerVendorDetails'
  private saveNewAuditApi ='api/audit/saveNewAudit'
  private saveExistingAuditApi ='api/audit/saveExistingAudit'
  private viewEsoApi ='api/eso/viewESO'
  private saveEsoApi ='api/eso/saveESO'
  private deleteEsoApi ='api/eso/deleteESO'


  viewDocId: any;
  viewAuditId: any;

  private formData: any;
  popno: any;
  vendorName: any;
  subject: any;
  eso: any;

  constructor(private http: HttpClient) {}


  auditableService(id:any){
    return this.http.get<any>(`${this.auditableDocApi}=${id}`)
  }
  saveFormData(data: any) {
    this.formData = data;
  }

  savevenodrs(val: any): Observable<any> {
    return this.http.post<any>(this.saveVendors, {
      vendor: {
        vendorNm: val,
      },
    });
  }
  getAutoPopulateVendors(id: any): Observable<any> {
    console.log('test');

    return this.http.get<any>(
      `${this.manageVendoeAutoPopulate}?sourceElement=${id}`
    );
  }
  getFormData() {
    return this.formData;
  }
esoNumbersApiData(val:any):Observable<any>{
  return this.http.get<any>(`${this.esoNumbersApi}=${val}`)

}

  ecoNumbers(num:any):Observable<any>{
    return this.http.get<any>(`${this.ecoNumbersValues}=${num}`)
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

  eccnNumber(): Observable<any> {
    return this.http.get<any>(`${this.eccNumberApi}?sourceElement=`);
  }
  eccnLocation(): Observable<any> {
    return this.http.get<any>(`${this.eccLocation}?sourceElement=`);
  }
  audDocType(): Observable<any> {
    return this.http.get<any>(`${this.docType}?sourceElement=`);
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
    inactiveInd: any
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
    return this.http.put<any>(
      `${this.saveDocumentCategoryUpdateApi}/${documentCatgCd}`,
      {
        documentCatgDesc,
      }
    );
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
      auditStatusCd,
      auditStatusDesc,
    });
  }

  saveAuditStatus1(
    auditStatusCd: any,
    auditStatusDesc: string
  ): Observable<any> {
    return this.http.put<any>(`${this.updateAuditStatusApi}/${auditStatusCd}`, {
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
      detailDocType,
      detailDocTypeDesc,
      auditableInd,
    });
  }

  saveDetailDocType1(
    detailDocType: any,
    detailDocTypeDesc: string,
    auditableInd: any
  ): Observable<any> {
    return this.http.put<any>(`${this.updateDetailDoc}/${detailDocType}`, {
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
    return this.http.post<any>(this.saveEccnNumberApi, { eccnNumber });
  }

  saveEccnNumber1(eccnNumber: any): Observable<any> {
    return this.http.put<any>(`${this.updateEccnNumberApi}/${eccnNumber}`, {
      eccnNumber,
    });
  }

  deleteEccnNumber(eccnNumber: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteEccnNumberApi}/${eccnNumber}`);
  }

  saveEccnLocation(
    eccnLocationCd: any,
    eccnLocationDesc: string
  ): Observable<any> {
    return this.http.post<any>(this.saveEccnLocationApi, {
      eccnLocationCd,
      eccnLocationDesc,
    });
  }

  saveEccnLocation1(
    eccnLocationCd: any,
    eccnLocationDesc: string
  ): Observable<any> {
    return this.http.put<any>(`${this.updateEccnLoaction}/${eccnLocationCd}`, {
      eccnLocationCd,
      eccnLocationDesc,
    });
  }

  deleteEccnLocation(eccnLocationCd: any): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteEccnLocationApi}/${eccnLocationCd}`
    );
  }

  saveNewDetail(payload:any){
    return this.http.post<any>(this.saveNewDetailApi,payload)
  }

  viewDetail(): Observable<any> {
    return this.http.get<any>(`${this.viewDetailApi}?popNo=${this.popno}`);
  }

  saveEditDetail(payload: any): Observable<any> {
    return this.http.post<any>(this.saveEditDetailApi, payload);
  }

  deleteDetail(): Observable<any> {
    return this.http.delete<any>(`${this.deleteDetailApi}?popNo=${this.popno}`);
  }

  saveFormerVendor(payload:any){
    return this.http.post<any>(this.saveFormerVendorApi,payload)
  }

  deleteFormerVendor(): Observable<any> {
    return this.http.delete<any>(this.deleteFormerVendorApi);
  }

  saveNewAudit(payload:any){
    return this.http.post<any>(this.saveNewAuditApi,payload)
  }

  saveExistingAudit(payload:any){
    return this.http.post<any>(this.saveExistingAuditApi,payload)
  }

  viewEso(): Observable<any> {
    return this.http.get<any>(`${this.viewEsoApi}/${this.eso}`);
  }

  saveEso(payload: any): Observable<any> {
    return this.http.post<any>(this.saveEsoApi, payload);
  }

  deleteEso(payload:any): Observable<any> {
    return this.http.delete<any>(this.deleteEsoApi, payload);
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
