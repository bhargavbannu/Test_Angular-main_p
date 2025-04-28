import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-eccn-location',
  templateUrl: './manage-eccn-location.component.html',
  styleUrls: ['./manage-eccn-location.component.css'],
})
export class ManageEccnLocationComponent {
  EccnLocations: any[] = [];
  btnIndex: any;
  clickFlag: boolean = false;
  saveNew: boolean = false;
  updateNew: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEccnLocations();
  }

  loadEccnLocations() {
    this.apiService.getEccnLocations().subscribe((data) => {
      this.EccnLocations = data;
    });
  }

  btnClick(index: any) {
    this.saveNew = false;
    this.updateNew = true;
    this.btnIndex = index;
    this.clickFlag = true;
  }
  createRow() {
    this.saveNew = true;
    this.EccnLocations.push({ eccnLocationCd: '', eccnLocationDesc: '', newRow: true });
  }

  saveRow(eccnLocationCd: any, eccnLocationDesc: any) {

    if(this.saveNew){
    this.apiService
      .saveEccnLocation(eccnLocationCd, eccnLocationDesc)
      .subscribe(() => {
        this.loadEccnLocations();
      });
    this.btnIndex = '';
  }
  else {
    this.apiService
      .saveEccnLocation1(eccnLocationCd, eccnLocationDesc)
      .subscribe(() => {
        this.loadEccnLocations();
      });
    this.btnIndex = ''
}
  }


  deleteRow(eccnLocationCd: any) {
    this.apiService.deleteEccnLocation(eccnLocationCd).subscribe(() => {
      this.loadEccnLocations();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.loadEccnLocations();
    this.btnIndex = '';
  }
}
