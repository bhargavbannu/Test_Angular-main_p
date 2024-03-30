import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  {id_no: '2258963', doc_ref: '96350-5698-2', ATA: '20.1797', Effectivity: 'A321NX', Vendor: 'Zodiac', subject: 'Rail', ESO: 'X-A321', ECO: 'F', Vendorpart: '96852-2560-0, 35879-2482-1', sections: '61'},
  {id_no: '2258964', doc_ref: '96350-5698-2', ATA: '20.1797', Effectivity: 'A321NX', Vendor: 'Safran', subject: 'Thrust', ESO: 'X-A321', ECO: 'F', Vendorpart: '96852-2560-0, 35879-2482-1', sections: '61'},
];
@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.css']
})
export class SearchPaginationComponent {
  displayedColumns: string[] = ['id_no', 'doc_ref', 'ATA', 'Vendor', 'Effectivity', 'subject', 'ESO', 'ECO', 'Vendorpart', 'sections', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
