import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search-audit',
  templateUrl: './search-audit.component.html',
  styleUrls: ['./search-audit.component.css'],
})
export class SearchAuditComponent {
  headers: any;
  data: any;
  size: any;
  totalPages: any;
  AAResvision: any;
  auditDateStart: any;
  auditDateEnd!: string | number | Date;
  unauditedDateStart!: string | number | Date;
  unauditedDateEnd!: string | number | Date;
  currentVendorRevisionDateStart: any;
  currentVendorRevisionDateEnd: any;
eso: any;
ata: any;
vendorName: any;
detailDocType: any;
effectivity: any[]=[];
currentVendorRevision: any;
auditCategory: any[]=[];
auditStatus: any;
  auditYears: any[]=[];
  constructor(private service: ApiService, private cdr:ChangeDetectorRef) {}

  selectedOption: any;
  totalCount: any;
  recordsPerPage: any = 15; // Number of records per page
  currentPage: any = 1;
  start: any;
  maxVisibleButtons: any = 8;
  loading: boolean = false;

  @ViewChild('calendar1') calendar1!: Calendar;
  @ViewChild('calendar2') calendar2!: Calendar;
  @ViewChild('calendar3') calendar3!: Calendar;
  @ViewChild('calendar4') calendar4!: Calendar;
  @ViewChild('calendar5') calendar5!: Calendar;
  @ViewChild('calendar6') calendar6!: Calendar;

  ngOnInit() {
    this.selectedOption = 'B';
    const formData = this.service.getFormData();
    if (formData) {
      this.eso = formData.eso;
      this.ata = formData.ata;
      this.vendorName = formData.vendorName, 
      this.detailDocType = formData.detailDocType,
      this.AAResvision = formData.currentAARevision,
      this.selectedOption = formData.searchType,
      this.auditDateStart = formData.auditDateStart,
      this.auditDateEnd = formData.auditDateEnd,
      this.unauditedDateStart = formData.unauditedDateStart,
      this.unauditedDateEnd = formData.unauditedDateEnd,
      this.currentVendorRevision = formData.currentVendorRevision,
      this.currentVendorRevisionDateStart = formData.currentVendorRevisionDateStart,
      this.currentVendorRevisionDateEnd = formData.currentVendorRevisionDateEnd,
      this.auditStatus = formData.auditStatus,
      this.auditCategory = formData.auditCategory,
      this.effectivity = formData.effectivity
      this.onSearch();
    }
    this.cdr.detectChanges();
  }
  onSearch() {
    this.service.searchType = "audit";
    const formData = {
      eso: this.eso,
      ata: this.ata,
      vendorName: this.vendorName, 
      detailDocType: this.detailDocType,
      currentAARevision: this.AAResvision,
      searchType: this.selectedOption,
      auditDateStart: this.auditDateStart,
      auditDateEnd: this.auditDateEnd, 
      unauditedDateStart: this.unauditedDateStart,
      unauditedDateEnd: this.unauditedDateEnd,
      currentVendorRevision: this.currentVendorRevision,
      currentVendorRevisionDateStart: this.currentVendorRevisionDateStart,
      currentVendorRevisionDateEnd:this.currentVendorRevisionDateEnd,
      auditStatus: this.auditStatus,
      auditCategory: this.auditCategory,
      effectivity: this.effectivity
    };
    this.service.saveFormData(formData);
    this.loading = true;
    this.start = (this.currentPage - 1) * this.recordsPerPage;
    this.size = this.recordsPerPage;
    const payload = {
      eso: this.eso,
      ata: this.ata,
      vendorName: this.vendorName,
      detailDocType: this.detailDocType,
      currentAARevision: this.AAResvision,
      searchType: this.selectedOption,
      auditDateStart: this.auditDateStart,
      auditDateEnd: this.auditDateEnd,
      unauditedDateStart: this.unauditedDateStart,
      unauditedDateEnd: this.unauditedDateEnd,
      currentVendorRevision: this.currentVendorRevision,
      currentVendorRevisionDateStart: this.currentVendorRevisionDateStart,
      currentVendorRevisionDateEnd: this.currentVendorRevisionDateEnd,
      auditStatus: this.auditStatus,
      auditCategory: this.auditCategory,
      effectivity: this.effectivity
    };
    this.service
      .auditsData(payload, this.start / this.size + 1, this.size)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.data = [...response.results];
        this.totalCount = response.totalRevisions;
        this.totalPages = response.totalPages;

     this.auditYears = this.data[0].auditYears.map((item :any)=> {    
           return item.year
        })
      
        console.log(this.auditYears);
        
      });
  }
  viewClick(id: any, vendorName: any, subject: any) {
    console.log(id, vendorName, subject);

    this.service.viewDocId = id;
    this.service.vendorName = vendorName;
    this.service.subject = subject;
  }
  goToFirst() {
    this.goToPage(1);
  }

  goToPrevious() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  getVisiblePages(): number[] {
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.maxVisibleButtons / 2)
    );
    let endPage = Math.min(
      startPage + this.maxVisibleButtons - 1,
      this.totalPages
    );

    // if (endPage - startPage < this.maxVisibleButtons - 1) {
    //   startPage = Math.max(1, endPage - this.maxVisibleButtons + 1);
    // }
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - this.maxVisibleButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  goToPage(page: any) {
    this.currentPage = page;
    console.log(this.currentPage);

    this.onSearch();
  }

  getSelectedRadioValue(eve: any) {
    console.log(eve.target.value);
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToLast() {
    this.goToPage(this.totalPages);
  }

  clear(form: NgForm){
    form.resetForm()
  }

  downloadExcel(): void {
    this.service.exportToExcel(this.data, 'my_records');
  }

  getYears(row:any):any{
    // if(header === 'auditYears'){
    //  return row[header].map((item :any)=> item.year).join(', ')
    // } else {
    //  return row[header].year
    // }
  return row.auditYears.map((item :any)=> 
    item.mostRecentAuditForYear.auditDate)
    
}

viewAudit(row:any, colIndex:any){
 const auditYear =  row.auditYears[colIndex]; 
  if(auditYear && auditYear.mostRecentAuditForYear){
    const auditId = auditYear.mostRecentAuditForYear.auditId
    this.service.viewAuditId = auditId
  }

}
}
