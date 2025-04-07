import { Component, ViewChild } from '@angular/core';
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
auditDateEnd!: string|number|Date;
unauditedDateStart!: string|number|Date;
unauditedDateEnd!: string|number|Date;
currentVendorRevisionDateStart: any;
currentVendorRevisionDateEnd: any;
  constructor(private service: ApiService) {}

  selectedOption: any;
  totalCount: any;
  recordsPerPage: any = 10; // Number of records per page
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

  ngOnInIt() {}
  onSearch() {
    console.log(this.selectedOption);
    this.loading = true;
    this.start = (this.currentPage - 1) * this.recordsPerPage;
    this.size = this.recordsPerPage;
    const payload = {
      searchType: this.selectedOption,
      currentAARevision: this.AAResvision,
    };
    this.service
      .auditsData(payload, this.start / this.size, this.size)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.data = [...response.results];
        this.totalCount = response.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.recordsPerPage);
        // this.tottalCount = response.totalCount;

        this.headers = Object.keys(this.data[0]);
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

    if (endPage - startPage < this.maxVisibleButtons - 1) {
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
}
