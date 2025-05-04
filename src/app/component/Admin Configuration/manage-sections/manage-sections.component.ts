import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-manage-sections',
  templateUrl: './manage-sections.component.html',
  styleUrls: ['./manage-sections.component.css']
})
export class ManageSectionsComponent {
  btnIndex: any;
  saveNew: boolean=false;
  savedSection: boolean = false;
  sectionDeleted: boolean = false;
edit() {
throw new Error('Method not implemented.');
}
dataFlag: boolean = false;
  sections: any[]=[];
clickFlag: boolean = false

  constructor(private apiService: ApiService,
    private router: Router,
  ){}

  ngOnInit(){
    console.log(this.clickFlag);   
    this.loadSections();
  }

  loadSections(){
    this.apiService.getSections().subscribe(data =>{
      this.sections = data;  
      this.dataFlag = true;
    })
  }
  btnClick(index: any){
    this.saveNew = false;
    this.btnIndex = index
    this.clickFlag = true  
    this.savedSection = false;
    this.sectionDeleted = false;
  }
  createRow(){
    this.saveNew = true;
    this.sections.push({section:"",description:"",inactiveInd:"",inactiveDate:"", newRow:true});
    this.savedSection = false;
    this.sectionDeleted = false;
  }

  saveRow(section:any, description:string,inactiveInd:any,inactiveDate:any){
  
    if(this.saveNew){
    this.apiService.updateManageSections(section, description,inactiveInd,inactiveDate).subscribe((res)=>{
      if(res){
        this.savedSection = true;
      }
      else {
        this.savedSection = false;
      }
      this.loadSections()
    })
    this.btnIndex =""
  }
  else {
    this.apiService.updateManageSections1(section, description,inactiveInd).subscribe((res)=>{
      if(res){
        this.savedSection = true;
      }
      else {
        this.savedSection = false;
      }
      this.loadSections()
    })
    this.btnIndex =""
  }
  
}

  deleteRow(section:any){
    this.apiService.deleteManageSections(section).subscribe((res)=>{
      if(res){
        this.sectionDeleted = true;
      }
      else {
        this.sectionDeleted = false;
      }
      this.loadSections()
    })
    this.btnIndex =""
  }

  cancelRow(){
    this.loadSections()
     this.btnIndex =""
  }
  
}
