import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  role: any;
  nextRouteType: any;
  clearFields!: boolean;
  detailID: any;
  
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
  private readonly api = `${environment.apiBaseUrl}/search/documentSearch?`;
  private readonly routesAPi = `${environment.apiBaseUrl}/search/routeSearch?`;
  private readonly auditsApi = `${environment.apiBaseUrl}/search/auditSearch?`;
  private readonly manageAuditStatusesApi = `${environment.apiBaseUrl}/adminConfiguration/manageAuditStatuses`;
  private readonly manageDetailDocTypesApi = `${environment.apiBaseUrl}/adminConfiguration/manageDetailDocTypes`;
  private readonly ecoNumbersValues = `${environment.apiBaseUrl}/eco/getECOs?sourceElement`;
  private readonly esoNumbersApi = `${environment.apiBaseUrl}/eso/getESOs?sourceElement`;
  private readonly auditableDocApi = `${environment.apiBaseUrl}/adminConfiguration/getAuditableDetailDocTypes?sourceElement`
  private readonly viewRouteInDetail = `${environment.apiBaseUrl}/routing/viewRoute?routeId`;
  private readonly manageEffectivitiesApi = `${environment.apiBaseUrl}/adminConfiguration/manageEffectivities`;
  private readonly manageEccnNumbersApi = `${environment.apiBaseUrl}/adminConfiguration/manageEccnNumbers`;
  private readonly manageEccnLocationsApi = `${environment.apiBaseUrl}/adminConfiguration/manageEccnLocations`;
  private readonly documentCategoriesApi = `${environment.apiBaseUrl}/adminConfiguration/documentCategories`;
  private readonly manageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/manageSections`;
  private readonly addDocumentApi = `${environment.apiBaseUrl}/addDocument/saveDocument`;
  private readonly saveManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewSection`;
  private readonly updateManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/editSection`;
  private readonly deleteManageSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/deleteSection`;
  private readonly saveDocumentCategoryApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewDocumentCategory`;
  private readonly saveDocumentCategoryUpdateApi = `${environment.apiBaseUrl}/adminConfiguration/updateDocumentCategory`;
  private readonly deleteDocumentCategoryApi = `${environment.apiBaseUrl}/adminConfiguration/deleteDocumentCategory`;
  private readonly saveAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewAuditStatus`;
  private readonly updateAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/editAuditStatus`;
  private readonly deleteAuditStatusApi = `${environment.apiBaseUrl}/adminConfiguration/deleteAuditStatus`;
  private readonly saveDetailDocTypeApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewDetailDocType`;
  private readonly updateDetailDoc = `${environment.apiBaseUrl}/adminConfiguration/updateDetailDocType`;
  private readonly deleteDetailDocTypeApi = `${environment.apiBaseUrl}/adminConfiguration/deleteDetailDocType`;
  private readonly saveEffectivityApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEffectivity`;
  private readonly deleteEffectivityApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEffectivity`;
  private readonly saveEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEccnNumber`;
  private readonly updateEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/updateEccnNumber`;
  private readonly deleteEccnNumberApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEccnNumber`;
  private readonly updateEccnLoaction = `${environment.apiBaseUrl}/adminConfiguration/updateEccnLocation`;
  private readonly saveEccnLocationApi = `${environment.apiBaseUrl}/adminConfiguration/saveNewEccnLocation`;
  private readonly deleteEccnLocationApi = `${environment.apiBaseUrl}/adminConfiguration/deleteEccnLocation`;
  private readonly viewSearchApi = `${environment.apiBaseUrl}/addDocument/viewDocument`;
  private readonly viewAuditApi = `${environment.apiBaseUrl}/audit/viewAudit`;
  private readonly deleteAuditApi = `${environment.apiBaseUrl}/audit/deleteAudit`;
  private readonly viewAllAuditsApi = `${environment.apiBaseUrl}/audit/viewAllAudits`;
  private readonly eccNumberApi = `${environment.apiBaseUrl}/adminConfiguration/getEccnNumbers`;
  private readonly eccLocation = `${environment.apiBaseUrl}/adminConfiguration/getEccnLocations`;
  private readonly docType = `${environment.apiBaseUrl}/adminConfiguration/getAuditableDetailDocTypes`;
  private readonly manageVendoeAutoPopulate = `${environment.apiBaseUrl}/adminConfiguration/getVendors`;
  private readonly saveVendors = `${environment.apiBaseUrl}/adminConfiguration/saveVendor`;
  private readonly saveNewDetailApi = `${environment.apiBaseUrl}/detail/saveNewDetail`;
  private readonly viewDetailApi = `${environment.apiBaseUrl}/detail/viewDetail`;
  private readonly saveEditDetailApi = `${environment.apiBaseUrl}/detail/saveDetail`
  private readonly deleteDetailApi = `${environment.apiBaseUrl}/detail/deleteDetail`
  private readonly saveFormerVendorApi =`${environment.apiBaseUrl}/formerVendor/createSupercededVendorDetails`
  private readonly deleteFormerVendorApi =`${environment.apiBaseUrl}/formerVendor/deleteFormerVendor`
  private readonly saveNewAuditApi =`${environment.apiBaseUrl}/audit/saveNewAudit`
  private readonly saveExistingAuditApi =`${environment.apiBaseUrl}/audit/saveExistingAudit`
  private readonly viewEsoApi =`${environment.apiBaseUrl}/eso/viewESO`
  private readonly saveEsoApi =`${environment.apiBaseUrl}/eso/saveESO`
  private readonly deleteEsoApi =`${environment.apiBaseUrl}/eso/deleteESO`
  private readonly saveExistingRouteApi =`${environment.apiBaseUrl}/routing/saveRoute`
  private readonly deleteRouteApi =`${environment.apiBaseUrl}/routing/deleteRoute`
  private readonly addNewEsoApi=`${environment.apiBaseUrl}/eso/addNewEso`
  private readonly moveDetailApi = `${environment.apiBaseUrl}/detail/moveDetail`
  private readonly newRouteApi = `${environment.apiBaseUrl}/routing/newRouteSave`
  private readonly esoByEffectivityAPi = `${environment.apiBaseUrl}/eso/getEsoByEffectivityId`
  private readonly dispositionApi = `${environment.apiBaseUrl}/routing/getDispositions`
  private readonly routeSlipDownloadApi = `${environment.apiBaseUrl}/routing/downloadRoutingSlip`
  private readonly docDownloadApi = `${environment.apiBaseUrl}/search/documentReport`
  private readonly auditDownloadApi = `${environment.apiBaseUrl}/search/exportAudit`
  private readonly routeDownloadApi = `${environment.apiBaseUrl}/search/openRouteReport`
  private readonly deleteDocumentApi = `${environment.apiBaseUrl}/addDocument/deleteDocument`
  private readonly documentDetailsApi = `${environment.apiBaseUrl}/audit/getDocumentDetails`
  private readonly deleteVendorApi = `${environment.apiBaseUrl}/adminConfiguration/deleteVendor`
  private readonly getVendorIdApi = `${environment.apiBaseUrl}/adminConfiguration/getVendor?vendorName`
  private readonly searchDetailDocTypeApi = `${environment.apiBaseUrl}/adminConfiguration/allDetailDocTypes`;
  private readonly documentSectionApi = `${environment.apiBaseUrl}/adminConfiguration/addDocumentGetSections`;
  private readonly searchEffectivityApi = `${environment.apiBaseUrl}/adminConfiguration/activeEffectivities`;
  private readonly searchDocAllSectionsApi = `${environment.apiBaseUrl}/adminConfiguration/allSections`;
  private readonly addDocvendorDetailsApi = `${environment.apiBaseUrl}/adminConfiguration/selectVendor`;
  private readonly activeEsoCheck = `${environment.apiBaseUrl}/eso/checkActiveESO?eso`;
  private readonly getAuditableDocTypesApi =`${environment.apiBaseUrl}/audit/getAuditableDocTypes?documentNbr`;

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

  constructor(private readonly http: HttpClient) {}

  esoActiveCheck(nmbr:any){
    return this.http.get<any>(`${this.activeEsoCheck}=${nmbr}`, {responseType: 'text' as 'json'});
  }
   getAuditableDocTypes(){
    return this.http.get<any>(`${this.getAuditableDocTypesApi}=${this.viewDocId}`);
  }
  getDetaildocType(): Observable<any> {
    return this.http.get<any>(this.searchDetailDocTypeApi);
  }

  getDocumentSection(): Observable<any> {
    return this.http.get<any>(this.documentSectionApi);
  }

  getSearchEffetivity(): Observable<any> {
    return this.http.get<any>(this.searchEffectivityApi);
  }

  getsearchDocAllSections(): Observable<any> {
    return this.http.get<any>(this.searchDocAllSectionsApi);
  }

  saveExistingRouteView(viewRoute:any, payload:any){
  return this.http.post<any>(`${this.saveExistingRouteApi}?routeId=${viewRoute}`, payload)
  }

  getVendorId(VenName:any){
  return this.http.get<any>(`${this.getVendorIdApi}=${VenName}`);
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

  savevendor(val: any): Observable<any> {
    return this.http.post<any>(this.saveVendors, val)
  }
  
  getAutoPopulateVendors(id: any): Observable<any> {
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

  addDocvendorDetails(payload: any): Observable<any> {
    return this.http.post<any>(this.addDocvendorDetailsApi, payload);
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

  deleteVendor(id: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteVendorApi}/${id}`);
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

  deleteDocument(): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteDocumentApi}?documentNbr=${this.viewDocId}`
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
    let effectivityDto = null;
    return this.http.post<any>(this.saveEffectivityApi, {
      effectivityId,
      effectivityFleet: { effectivityId, effectivityDto, esoMinSeqNbr, esoMaxSeqNbr, esoCurrSeqNbr },
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

  viewDetail1(popNO:any): Observable<any> {
    return this.http.get<any>(`${this.viewDetailApi}?popNo=${popNO}`);
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

  deleteFormerVendor(payload:any) {
    return this.http.post<any>(this.deleteFormerVendorApi,payload);    
  }

   deleteAudit(payload:any) {
    return this.http.post<any>(this.deleteAuditApi,payload);    
  }

   deleteRoute(payload:any) {
    return this.http.post<any>(this.deleteRouteApi,payload);     
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
    return this.http.post<any>(this.deleteEsoApi, payload);
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

  routeSlipDownload(id:any, options:any){
    return this.http.get<any>(`${this.routeSlipDownloadApi}?routeId=${id}`, options);
  }

  docDownload(payload:any, options:any){
    return this.http.post<any>(`${this.docDownloadApi}`,payload, options);
  }

  auditDownload(payload:any, options:any){
    return this.http.post<any>(`${this.auditDownloadApi}`,payload, options);
  }

  routeDownload(payload:any, options:any){
    return this.http.post<any>(`${this.routeDownloadApi}`,payload, options);
  }

  documentDetails(){
    return this.http.get<any>(`${this.documentDetailsApi}?documentNbr=${this.viewDocId}`)
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
