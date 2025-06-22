import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';


export interface PeriodicElement {
  id_no: string;
  doc_ref: string;
  ATA: string;
  Vendor: string;
  Effectivity: string;
  subject: string;
  ESO: string;
  ECO: string;
  Vendorpart: string;
  sections: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id_no: '2258963',
    doc_ref: '96350-5698-2',
    ATA: '20.1797',
    Effectivity: 'A321NX',
    Vendor: 'Zodiac',
    subject: 'Rail',
    ESO: 'X-A321',
    ECO: 'F',
    Vendorpart: '96852-2560-0, 35879-2482-1',
    sections: '61',
  },
  {
    id_no: '2258964',
    doc_ref: '96350-5698-2',
    ATA: '20.1797',
    Effectivity: 'A321NX',
    Vendor: 'Safran',
    subject: 'Thrust',
    ESO: 'X-A321',
    ECO: 'F',
    Vendorpart: '96852-2560-0, 35879-2482-1',
    sections: '61',
  },
];
@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.css'],
  providers: [DatePipe],

})
export class SearchPaginationComponent {

@ViewChild('calendar1') calendar1!: Calendar;
@ViewChild('calendar2') calendar2!: Calendar;
@ViewChild('calendar3') calendar3!: Calendar;
@ViewChild('calendar4') calendar4!: Calendar;

  displayedColumns: string[] = [
    'id_no',
    'doc_ref',
    'ATA',
    'Vendor',
    'Effectivity',
    'subject',
    'ESO',
    'ECO',
    'Vendorpart',
    'sections',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  options = [
    { value: 'A319XF', label: 'A319XF' },
    { value: 'A320', label: 'A320' },
    { value: 'A321', label: 'A321' },
    { value: 'A321NX', label: 'A321NX' },
    { value: 'A321XF', label: 'A321XF' },
    { value: 'A321XLR', label: 'A321XLR' },
    { value: 'A330', label: 'A330' },
    { value: 'ALL', label: 'ALL' },
    { value: 'B737-MAX8', label: 'B737-MAX8' },
    { value: 'B737-NG', label: 'B737-NG' },
    { value: 'B777', label: 'B777' },
    { value: 'B787', label: 'B787' },
    { value: 'CFM56-5B', label: 'CFM56-5B' },
    { value: 'CFM56-7B', label: 'CFM56-7B' },
    { value: 'GE90-100', label: 'GE90-100' },
    { value: 'GENX-1B', label: 'GENX-1B' },
    { value: 'LEAP-1A', label: 'LEAP-1A' },
    { value: 'LEAP-1B', label: 'LEAP-1B' },
    { value: 'TRENT 800', label: 'TRENT 80' },
    { value: 'V2500 A1/A5', label: 'V2500 A1/A5' },
    { value: '727', label: '727' },
    { value: '737', label: '737' },
    { value: '737-200', label: '737-200' },
    { value: '737-300', label: '737-300' },
    { value: '737-8', label: '737-8' },
    { value: '737-800', label: '737-800' },
    { value: '737_MAX8', label: '737_MAX8' },
    { value: '747', label: '747' },
    { value: '757', label: '757' },
    { value: '767', label: '767' },
    { value: 'A319', label: 'A319' },
    { value: '767-300', label: '767-300' },
    { value: '777', label: '777' },
    { value: '777-300', label: '777-300' },
    { value: '787', label: '787' },
    { value: 'A300', label: 'A300' },
    { value: 'A300-600', label: 'A300-600' },
    { value: 'A319/A321', label: 'A319/A321' },
    { value: 'A321-NX', label: 'A321-NX' },
    { value: 'A350', label: 'A350' },
    { value: 'ATR42', label: 'ATR42' },
    { value: 'ATR72', label: 'ATR72' },
    { value: 'B757', label: 'B757' },
    { value: 'B767', label: 'B767' },
    { value: 'B787-8', label: 'B787-8' },
    { value: 'BAE146', label: 'BAE146' },
    { value: 'CF34-10E', label: 'CF34-10E' },
    { value: 'CF6', label: 'CF6' },
    { value: 'CF6-50', label: 'CF6-50' },
    { value: 'CF6-6', label: 'CF6-6' },
    { value: 'CF6-80', label: 'CF6-80' },
    { value: 'CF6-80A', label: 'CF6-80A' },
    { value: 'CF6-80C2', label: 'CF6-80C2' },
    { value: 'CFM56-3', label: 'CFM56-3' },
    { value: 'CRJ700', label: 'CRJ700' },
    { value: 'DC10', label: 'DC10' },
    { value: 'E190', label: 'E190' },
    { value: 'EMB-145', label: 'EMB-145' },
    { value: 'GPU85-95DHF', label: 'GPU85-95DHF' },
    { value: 'JT8D', label: 'JT8D' },
    { value: 'JT8D-200', label: 'JT8D-200' },
    { value: 'JT9D', label: 'JT9D' },
    { value: 'MD11', label: 'MD11' },
    { value: 'MD80', label: 'MD80' },
    { value: 'MD90', label: 'MD90' },
    { value: 'PW4000', label: 'PW4000' },
    { value: 'RB211 TRENT', label: 'RB211 TRENT' },
    { value: 'RB211-535', label: 'RB211-535' },
    { value: 'RB211-535E4', label: 'RB211-535E4' },
    { value: 'RB211-TRENT', label: 'RB211-TRENT' },
    { value: 'SAAB340', label: 'SAAB340' },
    { value: 'TAY 650', label: 'TAY 650' },
    { value: 'TAY650-15', label: 'TAY650-15' },
    { value: 'TRENT-XWB', label: 'TRENT-XWB' },
    { value: 'V2533-SQ03', label: 'V2533-SQ03' },
  ];

  sectionsList = [
    { value: '0', label: '0 - 0' },
    { value: '1', label: '1 - 1- RELIABILITY/EIS ENGINEERING' },
    { value: '3', label: '3 - 3' },
    { value: '4', label: '4 - 4' },
    { value: '5', label: '5 - 5' },
    { value: '6', label: '6 - 6' },
    { value: '7', label: '7 - 7' },
    { value: '8', label: '8 - 8' },
    { value: '9', label: '9 - 9' },
    { value: '10', label: '10 - 10' },
    { value: '11', label: '11 - 11' },
    { value: '12', label: '12 - 12' },
    { value: '13', label: '13 - 13' },
    { value: '14', label: '14 - 14' },
    { value: '15', label: '15 - 15' },
    { value: '17', label: '17 - 17' },
    { value: '18', label: '18 - 18' },
    { value: '20', label: '20 - 20' },
    { value: '21', label: '21 - 21' },
    { value: '22', label: '22 - 22' },
    { value: '23', label: '23 - 23' },
    { value: '25', label: '25 - 25' },
    { value: '26', label: '26 - 26' },
    { value: '27', label: '27 - 27' },
    { value: '28', label: '28 - 28' },
    { value: '30', label: '30 - 30' },
    { value: '34', label: '34 - 34' },
    { value: '35', label: '35 - 35' },
    { value: '36', label: '36 - 36' },
    { value: '37', label: '37 - 37' },
    { value: '38', label: '38 - 38' },
    { value: '39', label: '39 - 39' },
    { value: '40', label: '40 - 40' },
    { value: '44', label: '44 - 44' },
    { value: '45', label: '45 - 45' },
    { value: '47', label: '47 - 47' },
    { value: '50', label: '50 - 50' },
    { value: '51', label: '51 - 51' },
    { value: '60', label: '60 - 60' },
    { value: '61', label: '61 - 61' },
    { value: '62', label: '62 - 62' },
    { value: '63', label: '63 - 63' },
    { value: '64', label: '64 - 64' },
    { value: '71', label: '71-71' },
    { value: '72', label: '72 - 72' },
    { value: '73', label: '73 - 73' },
    { value: '74', label: '74 - 74-CHRISTOPER EEVES' },
    { value: '75', label: '75 - 75' },
    { value: '76', label: '76 - 76' },
    { value: '77', label: '77 - 77' },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
manualStartDate: any;
manualEndDate: any;
reissueStartDate: any;
reissueEndDate: any;
vdtId: any;
selectedEffectivity: any[]=[];
subject: any;
bin: any;
documentType: any;
selectedSection: any[]=[];
documentSubject: any;
 searchDocAllSections: any;
  searchEffetivity: any;
@ViewChild('childForm') childForm!: NgForm


  constructor(private apiService:ApiService, private datePipe: DatePipe) {}

  ngOnInit(){
    const formData = this.apiService.getFormData();
    if (formData && this.apiService.clearFields === false) {
      this.vdtId = formData.vdtId;
      this.selectedEffectivity = formData.selectedEffectivity;
      this.subject = formData.subject;
      this.bin = formData.bin;
      this.selectedSection = formData.selectedSection;
      this.manualStartDate = formData.manualStartDate;
      this.manualEndDate = formData.manualEndDate;
      this.reissueStartDate = formData.reissueStartDate;
      this.reissueEndDate = formData.reissueEndDate;
      this.documentSubject = formData.documentSubject;
      this.manualStartDate = this.datePipe.transform(
        this.manualStartDate,
        'MM/dd/yyyy'
      );
      this.manualEndDate = this.datePipe.transform(
        this.manualEndDate,
        'MM/dd/yyyy'
      );
      this.reissueStartDate = this.datePipe.transform(
        this.reissueStartDate,
        'MM/dd/yyyy'
      );
      this.reissueEndDate = this.datePipe.transform(
        this.reissueEndDate,
        'MM/dd/yyyy'
      );
    }

      this.apiService.getsearchDocAllSections().subscribe((data) => {
      this.searchDocAllSections = data;
    });

    this.apiService.getSearchEffetivity().subscribe((data) => {
      this.searchEffetivity = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  clearFields(){
    this.childForm.resetForm();
    this.apiService.clearFields = true;
  }

  formatDate1(date: Date) {
    this.manualStartDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  formatDate2(date: Date) {
    this.manualEndDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  formatDate3(date: Date) {
    this.reissueStartDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  formatDate4(date: Date) {
    this.reissueEndDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }  
}
