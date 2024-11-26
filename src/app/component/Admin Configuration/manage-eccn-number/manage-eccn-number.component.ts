import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-eccn-number',
  templateUrl: './manage-eccn-number.component.html',
  styleUrls: ['./manage-eccn-number.component.css'],
})
export class ManageEccnNumberComponent {
  EccnNumbers: any[] = [];
  btnIndex: any;
  clickFlag: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEccnNumbers();
  }

  loadEccnNumbers() {
    this.apiService.getEccnNumbers().subscribe((data) => {
      this.EccnNumbers = data;
    });
  }

  btnClick(index: any) {
    this.btnIndex = index;
    this.clickFlag = true;
  }
  createRow() {
    this.EccnNumbers.push({ eccnNumber: '', newRow:true });
  }

  saveRow(eccnNumber: any) {
    this.apiService.saveEccnNumber(eccnNumber).subscribe(() => {
      this.loadEccnNumbers();
    });
    this.btnIndex = '';
  }

  deleteRow(eccnNumber: any) {
    this.apiService.deleteEccnNumber(eccnNumber).subscribe(() => {
      this.loadEccnNumbers();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.loadEccnNumbers();
    this.btnIndex = '';
  }
}
