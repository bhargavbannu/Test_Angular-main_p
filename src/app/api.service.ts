import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  exportToExcel(data: any[], fileName: string): void {
    // Create worksheet from data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
    // Create workbook and add the worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };
    
    // Generate Excel file buffer
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    
    // Save the file
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
  private api = `${environment.apiBaseUrl}/search/documentSearch?`;
  private routesAPi = `${environment.apiBaseUrl}/search/routeSearch?`;
  private auditsApi = `${environment.apiBaseUrl}/search/auditSearch?`;
  private manageAuditStatusesApi = `${environment.apiBaseUrl}/adminConfiguration/manageAuditStatuses`;
  private manageDetailDocTypesApi =
    `${environment.apiBaseUrl}/adminConfiguration/manageDetailDocTypes`;
    private ecoNumbersValues = `${environment.apiBaseUrl}/eco/getECOs?sourceElement`;
    private esoNumbersApi = `${environment.apiBaseUrl}/eso/getESOs?sourceElement`;
    private auditableDocApi = `${environment.apiBaseUrl}/adminConfiguration/getAuditableDetailDocTypes?sourceElement`
 private viewRouteInDetail = `${environment.apiBaseUrl}/routing/viewRoute?routeId`;
//  `${environment.apiBaseUrl}
  private manageEffectivitiesApi = `${environment.apiBaseUrl}/adminConfiguration/manageEffectivities`;
  private manageEccnNumbersApi = `${environment.apiBaseUrl}/adminConfiguration/manageEccnNumbers`;
  private manageEccnLocationsApi = `${environment.apiBaseUrl}/adminConfiguration/manageEccnLocations`;
  private documentCategoriesApi = `${environment.apiBaseUrl}/adminConfiguration/documentCategories`;
  private manageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/manageSections`;
  private addDocumentApi = `${environment.apiBaseUrl}/addDocument/saveDocument`;
  private saveManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewSection`;
  private updateManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/editSection`;
  private deleteManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/deleteSection`;
  private saveDocumentCategoryApi =
    `${environment.apiBaseUrl}/adminConfiguration/saveNewDocumentCategory`;
  private saveDocumentCategoryUpdateApi =
    `${environment.apiBaseUrl}/adminConfiguration/updateDocumentCategory`;
  private deleteDocumentCategoryApi =
    `${environment.apiBaseUrl}/adminConfiguration/deleteDocumentCategory`;
  private saveAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewAuditStatus`;
  private updateAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/editAuditStatus`;
  private deleteAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/deleteAuditStatus`;
  private saveDetailDocTypeApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewDetailDocType`;
  private updateDetailDoc = `${environment.apiBaseUrl}/adminConfiguration/updateDetailDocType`;
  private deleteDetailDocTypeApi = `${environment.apiBaseUrl}/adminConfiguration/deleteDetailDocType`;
  private saveEffectivityApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEffectivity`;
  private deleteEffectivityApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEffectivity`;
  private saveEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEccnNumber`;
  private updateEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/updateEccnNumber`;
  private deleteEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEccnNumber`;
  private updateEccnLoaction = `${environment.apiBaseUrl}/adminConfiguration/updateEccnLocation`;
  private saveEccnLocationApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEccnLocation`;
  private deleteEccnLocationApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEccnLocation`;
  private viewSearchApi = `${environment.apiBaseUrl}/addDocument/viewDocument`;
  private viewAuditApi = `${environment.apiBaseUrl}/audit/viewAudit`;
  private viewAllAuditsApi = `${environment.apiBaseUrl}/audit/viewAllAudits`;
  private eccNumberApi = `${environment.apiBaseUrl}/adminConfiguration/getEccnNumbers`;
  private eccLocation = `${environment.apiBaseUrl}/adminConfiguration/getEccnLocations`;
  private docType = `${environment.apiBaseUrl}/adminConfiguration/getAuditableDetailDocTypes`;
  private manageVendoeAutoPopulate = `${environment.apiBaseUrl}/adminConfiguration/getVendors`;
  private saveVendors = `${environment.apiBaseUrl}/adminConfiguration/saveVendor`;
  private saveNewDetailApi = `${environment.apiBaseUrl}/detail/saveNewDetail`;
  private viewDetailApi = `${environment.apiBaseUrl}/detail/viewDetail`;
  private saveEditDetailApi = `${environment.apiBaseUrl}/detail/saveDetail`
  private deleteDetailApi = `${environment.apiBaseUrl}/detail/deleteDetail`
  private saveFormerVendorApi =`${environment.apiBaseUrl}/formerVendor/createSupercededVendorDetails`
  private deleteFormerVendorApi =`${environment.apiBaseUrl}/formerVendor/deleteFormerVendorDetails`
  private saveNewAuditApi =`${environment.apiBaseUrl}/audit/saveNewAudit`
  private saveExistingAuditApi =`${environment.apiBaseUrl}/audit/saveExistingAudit`
  private viewEsoApi =`${environment.apiBaseUrl}/eso/viewESO`
  private saveEsoApi =`${environment.apiBaseUrl}/eso/saveESO`
  private deleteEsoApi =`${environment.apiBaseUrl}/eso/deleteESO`
  private saveExistingRouteApi =`${environment.apiBaseUrl}/routing/saveRoute`
  private addNewEsoApi=`${environment.apiBaseUrl}/eso/addNewEso`
  private moveDetailApi = `${environment.apiBaseUrl}/detail/moveDetail`
  private newRouteApi = `${environment.apiBaseUrl}/routing/newRouteSave`
  private esoByEffectivityAPi = `${environment.apiBaseUrl}/eso/getEsoByEffectivityId`
  private dispositionApi = `${environment.apiBaseUrl}/routing/getDispositions`

detailRoute:any
  viewDocId: any;
  viewAuditId: any;

  formData: any;
  popno: any;
  vendorName: any;
  subject: any;
  eso: any;
  popRefNbr: any;
  section: any;
  type: any;
  searchType!: string;

  constructor(private http: HttpClient) {}

saveExistingRouteView(viewRoute:any, payload:any){
  return this.http.post<any>(`${this.saveExistingRouteApi}?routeId=${viewRoute}`, payload)
}

 viewRouteDetailApi(id:any){
  return this.http.get<any>(`${this.viewRouteInDetail}=${id}`)
 }
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

  addNewEso(payload:any): Observable<any> {
    return this.http.post<any>(this.addNewEsoApi, payload);
  }

  moveDetail(payload:any): Observable<any> {
    return this.http.post<any>(this.moveDetailApi, payload);
  }

  newRoute(payload:any){
    return this.http.post<any>(this.newRouteApi, payload);
  }

  esoByEffectivity(id:any){
    return this.http.get<any>(`${this.esoByEffectivityAPi}?effectivityId=${id}`)
  }

  disposition(value:any){
    return this.http.get<any>(`${this.dispositionApi}?sourceElement=${value}`)
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
