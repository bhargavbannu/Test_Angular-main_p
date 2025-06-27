import { sanitizeIdentifier } from '@angular/compiler';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { setLines } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { SearchPaginationComponent } from '../search-pagination/search-pagination.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DatePipe],

})
export class SearchComponent {

  records = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 }
  ];


 
  formData: any;
  totalFormData: any;
  advancedSearchValue: any;
  documents = [
    { value: '', label: '' },
    { value: 'AA SB', label: 'AA SB' },
    { value: 'ACMM', label: 'ACMM' },
    { value: 'ACMM/IPL', label: 'ACMM/IPL' },
    { value: 'AIPC', label: 'AIPC' },
    { value: 'ALS', label: 'ALS' },
    { value: 'AMDT', label: 'AMDT' },
    { value: 'AMM', label: 'AMM' },
    { value: 'AMM/IPL', label: 'AMM/IPL' },
    { value: 'AMOC', label: 'AMOC' },
    { value: 'AOL', label: 'AOL' },
    { value: 'ASM', label: 'ASM' },
    { value: 'ATP', label: 'ATP' },
    { value: 'AWL', label: 'AWL' },
    { value: 'AWM', label: 'AWM' },
    { value: 'CDCCL', label: 'CDCCL' },
    { value: 'CESM', label: 'CESM' },
    { value: 'CIR', label: 'CIR' },
    { value: 'CMM', label: 'CMM' },
    { value: 'CMM V1A', label: 'CMM V1A' },
    { value: 'CMM VOL1', label: 'CMM VOL1' },
    { value: 'CMM VOL2', label: 'CMM VOL2' },
    { value: 'CMM VOL3', label: 'CMM VOL3' },
    { value: 'CMM/3D', label: 'CMM/3D' },
    { value: 'CMM/ATTA', label: 'CMM/ATTA' },
    { value: 'CMM/IPC', label: 'CMM/IPC' },
    { value: 'CMM/IPD', label: 'CMM/IPD' },
    { value: 'CMM/IPL', label: 'CMM/IPL' },
    { value: 'CMM/SUPP', label: 'CMM/SUPP' },
    { value: 'CMP', label: 'CMP' },
    { value: 'CMP/IPD', label: 'CMP/IPD' },
    { value: 'CMP/IPL', label: 'CMP/IPL' },
    { value: 'CMS', label: 'CMS' },
    { value: 'CN', label: 'CN' },
    { value: 'CPD', label: 'CPD' },
    { value: 'CRM', label: 'CRM' },
    { value: 'CRM/IPL', label: 'CRM/IPL' },
    { value: 'CSB', label: 'CSB' },
    { value: 'DEFAULT', label: 'DEFAULT' },
    { value: 'EM', label: 'EM' },
    { value: 'ESI', label: 'ESI' },
    { value: 'FP', label: 'FP' },
    { value: 'GPM', label: 'GPM' },
    { value: 'IC', label: 'IC' },
    { value: 'ICA', label: 'ICA' },
    { value: 'IN', label: 'IN' },
    { value: 'IPC', label: 'IPC' },
    { value: 'IPC VOL2', label: 'IPC VOL2' },
    { value: 'IPL', label: 'IPL' },
    { value: 'IRM', label: 'IRM' },
    { value: 'MCMM', label: 'MCMM' },
    { value: 'MM', label: 'MM' },
    { value: 'MM/IPC', label: 'MM/IPC' },
    { value: 'MM/IPL', label: 'MM/IPL' },
    { value: 'MSPM', label: 'MSPM' },
    { value: 'NSC', label: 'NSC' },
    { value: 'OIT', label: 'OIT' },
    { value: 'OM', label: 'OM' },
    { value: 'OM/IPC', label: 'OM/IPC' },
    { value: 'OM/IPL', label: 'OM/IPL' },
    { value: 'OPER/MM', label: 'OPER/MM' },
    { value: ' OPER/MM/IPL', label: ' OPER/MM/IPL' },
    { value: 'OPNC', label: 'OPNC' },
    { value: 'OSDPR', label: 'OSDPR' },
    { value: 'PL', label: 'PL' },
    { value: 'PMP', label: 'PMP' },
    { value: 'RIL', label: 'RIL' },
    { value: 'RM', label: 'RM' },
    { value: 'RS', label: 'RS' },
    { value: 'SB', label: 'SB' },
    { value: 'SDS', label: 'SDS' },
    { value: 'SIL', label: 'SIL' },
    { value: 'SL', label: 'SL' },
    { value: 'SMM', label: 'SMM' },
    { value: 'SNL', label: 'SNL' },
    { value: 'SOPM', label: 'SOPM' },
    { value: 'SOPM INTRO', label: 'SOPM INTRO' },
    { value: 'SOPM INTRODUCTION', label: 'SOPM INTRODUCTION' },
    { value: 'SPB', label: 'SPB' },

    { value: 'SPCL', label: 'SPCL' },
    { value: 'SPIB', label: 'SPIB' },
    { value: 'SPM', label: 'SPM' },
    { value: 'SRM', label: 'SRM' },
    { value: 'TB', label: 'TB' },
    { value: 'TEM', label: 'TEM' },
    { value: 'TG', label: 'TG' },
    { value: 'TIL', label: 'TIL' },
    { value: 'TN', label: 'TN' },
    { value: 'TR', label: 'TR' },
    { value: 'TSG', label: 'TSG' },
    { value: 'TSM', label: 'TSM' },
    { value: 'TV', label: 'TV' },
    { value: 'USERHBK', label: 'USERHBK' },
    { value: 'V12', label: 'V12' },
    { value: 'V22', label: 'V22' },
    { value: 'VOL 1', label: 'VOL 1' },
    { value: 'VOL 2', label: 'VOL 2' },
    { value: 'VOL 3', label: 'VOL 3' },
    { value: 'VSB', label: 'VSB' },
    { value: 'WISE', label: 'WISE' },
    { value: 'WSPG', label: 'WSPG' },
  ];
  vendorName: any;
  flagg: any;
  eso: any;
  vendorPartRefNbr: any;

  recordsPerPage: any = 15; // Number of records per page
  currentPage: any = 1;
  totalPages: any;

  apiData: any;
  totalCount: any;
  tableHeaders: any;
  maxVisibleButtons: any = 8;
  start: any;
  size: any;
  loading: boolean = false;
  checkBoxValue: boolean = true;
  advancedSearchHidden: boolean = true;
  detailDocType: any;
  ITAR:any
  eccnNum:any
  eccnLoc:any
  eco: any;
  ata: any;
  detailId: any;
  EccnLocations: any[] = [];
  EccnNumbers: any[] = [];
  @ViewChild(SearchPaginationComponent) searchPagination!: SearchPaginationComponent;
  @ViewChild('myForm') myForm!: NgForm;
  downloadPayload: any;
docDeleted: any;
  dataFlag: boolean = false;
loadingDownload: boolean = false;
  searchDetailDocType: any[] = [];
  searchEffetivity: any[] = [];
  searchDocAllSections: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private cdr : ChangeDetectorRef,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
  }
  // "28796727"
  downloadExcel(): void {  
    this.loadingDownload = true;
    this.apiService.docDownload(this.downloadPayload,{observe:'response', responseType:'blob'}).subscribe((response:any)=>{
      this.loadingDownload = false;
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition.split('filename=')[1].trim().replace(/"/g, '');
      const blob = new Blob([response.body], { type: 'application/vnd.ms-excel' });
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = filename;
       a.click();
       window.URL.revokeObjectURL(url);
    });   
    // this.apiService.exportToExcel(this.apiData, 'my_records');
  }
  ngOnInit() {
    this.advancedSearchValue = 'Advanced Search (Display)';
    this.route.params.subscribe(params =>{
      this.docDeleted = params['docDeleted'];   
    })
    this.apiService.getEccnLocations().subscribe((data) => {
      this.EccnLocations = data;
    });
    this.apiService.getEccnNumbers().subscribe((data) => {
      this.EccnNumbers = data;
    });
        this.apiService.getDetaildocType().subscribe((data) => {
      this.searchDetailDocType = data;
    });
    this.apiService.getSearchEffetivity().subscribe((data) => {
      this.searchEffetivity = data;
    });
   // this.router.navigateByUrl('/search');
  }
  ngAfterViewInit() {
    const formData = this.apiService.getFormData();
    if (formData && !this.docDeleted) {      
      this.vendorName = formData.vendorName;
      this.checkBoxValue = formData.checkBoxValue;
      this.detailDocType = formData.detailDocType, 
      this.eso = formData.eso,
      this.eco = formData.eco,
      this.ata = formData.ata,
      this.detailId = formData.detailId,
      this.advancedSearchHidden = formData.advancedSearchHidden,
      this.currentPage = formData.currentPage;
      setTimeout(() => {
        if(this.detailId === undefined || this.detailId === null){ 
        this.Search();
        }
      }, 0);
    }
    this.cdr.detectChanges();

  }

  Search() {  
    this.apiService.searchType = "search";
    this.apiService.clearFields = false;
    const formData = {
      vendorName: this.vendorName,
      checkBoxValue: this.checkBoxValue,
      detailDocType: this.detailDocType, 
      eso: this.eso,
      eco: this.eco,
      ata: this.ata,
      detailId: this.apiService.detailID,
      advancedSearchHidden: this.advancedSearchHidden, 
      vdtId: this.searchPagination?.vdtId,
      selectedEffectivity: this.searchPagination?.selectedEffectivity,
      subject: this.searchPagination?.subject,
      bin: this.searchPagination?.bin,
      selectedSection:this.searchPagination?.selectedSection,
      manualStartDate: this.searchPagination?.manualStartDate,
      manualEndDate: this.searchPagination?.manualEndDate,
      reissueStartDate: this.searchPagination?.reissueStartDate,
      reissueEndDate: this.searchPagination?.reissueEndDate,
      documentSubject: this.searchPagination?.documentSubject,
      currentPage: this.currentPage
    };
    this.apiService.saveFormData(formData);
    this.loading = true;
    this.start = (this.currentPage - 1) * this.recordsPerPage;
    this.size = this.recordsPerPage;
     let manualStartDate = this.datePipe.transform(
      this.searchPagination?.manualStartDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    let manualEndDate = this.datePipe.transform(
      this.searchPagination?.manualEndDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    let reissueStartDate = this.datePipe.transform(
      this.searchPagination?.reissueStartDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    let reissueEndDate = this.datePipe.transform(
      this.searchPagination?.reissueEndDate,
      'yyyy-MM-ddTHH:mm:ss'
    );
    if(this.detailId === ''){this.detailId= undefined;}
    const payload = {
      vendorName: this.vendorName,
      currentVendorOnly: this.checkBoxValue,
      vendorPartRefNbr: this.vendorPartRefNbr,
      documentType: this.detailDocType, 
      eso: this.eso,
      eco: this.eco,
      ata: this.ata,
      detailId: this.detailId,
      advancedSearchHidden: this.advancedSearchHidden, 
      docName: this.searchPagination?.vdtId,
      effectivity: this.searchPagination?.selectedEffectivity,
      subject: this.searchPagination?.subject,
      bin: this.searchPagination?.bin,
      section:this.searchPagination?.selectedSection,
      manualStartDate: manualStartDate,
      manualEndDate: manualEndDate,
      reissueStartDate: reissueStartDate,
      reissueEndDate: reissueEndDate,
      documentSubject: this.searchPagination?.documentSubject,
      itar: this.ITAR,
      eccnNumber: this.eccnNum,
      eccnLocation: this.eccnLoc,


    };
    this.downloadPayload = payload;
    this.apiService
      .postData(payload, this.start / this.size + 1, this.size)
      .subscribe((data) => {
        if(data.results) {       
        this.apiData = [...data.results];
        this.totalCount = data.totalRevisions;
        this.totalPages = data.totalPages;
        this.loading = false;
        }
       if(this.detailId !== undefined && this.detailId !== null){       
        this.apiService.viewDocId = data.viewDocumentResponse.document.documentNbr;
        this.apiService.vendorName = data.viewDocumentResponse.vendor.vendorNm;
        this.apiService.subject = data.viewDocumentResponse.document.subject;
        this.router.navigate(['/viewStatus']);
       }
      });
  }

  getVisiblePages(): number[] {
    let totalVisible = this.maxVisibleButtons;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(totalVisible / 2)
    );
    let endPage = Math.min(
      startPage + this.maxVisibleButtons - 1,
      this.totalPages
    );

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - totalVisible + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
   
  }

  goToPage(page: any) {
    this.currentPage = page;
    this.Search();
  }

  goToFirst() {
    this.goToPage(1);
  }

  // Previous page
  goToPrevious() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  // Next page
  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  // Last page
  goToLast() {
    this.goToPage(this.totalPages);
  }

  advancedSearch() {
    if (this.advancedSearchValue === 'Advanced Search (Display)') {
      this.advancedSearchValue = 'Advanced Search (Hide)';
      this.advancedSearchHidden = false;
      // this.router.navigateByUrl('/search/advance-search');
    } else {
      this.advancedSearchValue = 'Advanced Search (Display)';
      this.advancedSearchHidden = true;
      // this.router.navigateByUrl('/search');
    }
  }

  viewClick(id: any, vendorName: any, subject: any) {
    this.apiService.viewDocId = id;
    this.apiService.vendorName = vendorName;
    this.apiService.subject = subject;
  }

  clear(){
    this.myForm.resetForm();
    this.searchPagination?.clearFields();
    this.advancedSearchHidden = true;
    this.advancedSearchValue = 'Advanced Search (Display)';
    this.checkBoxValue = true; 
    this.myForm.form.controls['currentVendorOnly'].setValue(true);
    this.apiData = null;
  }

  getWords():any {
    const words = ['','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'];
    if (this.totalCount > 0 && this.totalCount < 16) {
       return `${words[this.totalCount]} item${this.totalCount > 1 ? 's':''} found.`;
    }
  }
}
