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
  dataFlag: boolean = false;
  locationSaved: boolean = false;
  locationDeleted: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadEccnLocations();
  }

  loadEccnLocations() {
    this.apiService.getEccnLocations().subscribe((data) => {
      this.EccnLocations = data;
      this.dataFlag = true;
    });
  }

  btnClick(index: any) {
    this.saveNew = false;
    this.updateNew = true;
    this.btnIndex = index;
    this.clickFlag = true;
    this.locationSaved = false;
    this.locationDeleted = false;
  }
  createRow() {
    this.saveNew = true;
    this.EccnLocations.push({ eccnLocationCd: '', eccnLocationDesc: '', newRow: true });
    this.locationSaved = false;
    this.locationDeleted = false;
  }

  saveRow(eccnLocationCd: any, eccnLocationDesc: any) {

    if(this.saveNew){
    this.apiService
      .saveEccnLocation(eccnLocationCd, eccnLocationDesc)
      .subscribe((res) => {
        if(res){
          this.locationSaved = true;
        }
        else {
          this.locationSaved = false;
        }
        this.loadEccnLocations();
      });
    this.btnIndex = '';
  }
  else {
    this.apiService
      .saveEccnLocation1(eccnLocationCd, eccnLocationDesc)
      .subscribe((res) => {
        if(res){
          this.locationSaved = true;
        }
        else {
          this.locationSaved = false;
        }
        this.loadEccnLocations();
      });
    this.btnIndex = ''
}
  }


  deleteRow(eccnLocationCd: any) {
    this.apiService.deleteEccnLocation(eccnLocationCd).subscribe((res) => {
      if (res) {
        this.locationDeleted = true;
      } else {
        this.locationDeleted = false;
      }
      this.loadEccnLocations();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.loadEccnLocations();
    this.btnIndex = '';
  }
}
