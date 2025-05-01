import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.css'],
})
export class SearchRoutesComponent {
  headers: any;
  data: any;
  size: any;
  totalPages: any;
  routeStartDate: any;
  routeEndDate: any;
  routeType: any;
  section: any;
  detailDocType: any;
  effectivity: any[] = [];
  eso: any;
  ata: any;
  constructor(private service: ApiService, private cdr: ChangeDetectorRef) {}

  selectedOption: any;
  totalCount: any;
  recordsPerPage: any = 15; // Number of records per page
  currentPage: any = 1;
  start: any;
  maxVisibleButtons: any = 8;
  loading: boolean = false;

  @ViewChild('calendar1') calendar1!: Calendar;
  @ViewChild('calendar2') calendar2!: Calendar;

  ngOnInit() {
    const formData = this.service.getFormData();
    if (formData) {
      this.eso = formData.eso;
      this.ata = formData.ata;
      this.routeType = formData.routeType;
      this.section = formData.section;
      this.detailDocType = formData.detailDocType;
      this.selectedOption = formData.routeStatusSearchType;
      this.routeStartDate = formData.routeStartDate;
      this.routeEndDate = formData.routeEndDate;
      this.effectivity = formData.effectivity;
      this.onSearch();
    } else {
      this.routeType = '';
      this.section = '';
      this.detailDocType = '';
      this.selectedOption = 'BOTH'
    }
    this.cdr.detectChanges();
  }
  onSearch() {
    this.service.searchType = 'route';
    const formData = {
      routeType: this.routeType,
      section: this.section,
      routeStartDate: this.routeStartDate,
      routeEndDate: this.routeEndDate,
      routeStatusSearchType: this.selectedOption,
      detailDocType: this.detailDocType,
      eso: this.eso,
      ata: this.ata,
      effectivity: this.effectivity,
    };
    this.service.saveFormData(formData);
    this.loading = true;
    this.start = (this.currentPage - 1) * this.recordsPerPage;
    this.size = this.recordsPerPage;
    const payload = {
      routeType: this.routeType,
      section: this.section,
      routeStartDate: this.routeStartDate,
      routeEndDate: this.routeEndDate,
      routeStatusSearchType: this.selectedOption,
      detailDocType: this.detailDocType,
      eso: this.eso,
      ata: this.ata,
      effectivity: this.effectivity,
    };
    this.service
      .routesData(payload, this.start / this.size + 1, this.size)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.data = [...response.routes];
        this.totalCount = response.totalRevisions;
        this.totalPages = response.totalPages;
        
      });
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

  viewClick(id:any) {
    this.service.detailRoute = id;
  }

  downloadExcel(): void {
    this.service.exportToExcel(this.data, 'my_records');
  }

  getWords():any {
    const words = ['','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'];
    if (this.totalCount > 0 && this.totalCount < 16) {
       return `${words[this.totalCount]} item${this.totalCount > 1 ? 's':''} found.`;
    }
  }
}
