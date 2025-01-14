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
edit() {
throw new Error('Method not implemented.');
}
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
    })
  }
  btnClick(index: any){
    this.saveNew = false;
    this.btnIndex = index
    this.clickFlag = true  
  }
  createRow(){
    this.saveNew = true;
    this.sections.push({section:"",description:"",inactiveInd:"",inactiveDate:"", newRow:true})
  }

  saveRow(section:any, description:string,inactiveInd:any,inactiveDate:any){
  
    if(this.saveNew){
    this.apiService.updateManageSections(section, description,inactiveInd,inactiveDate).subscribe(()=>{
      this.loadSections()
    })
    this.btnIndex =""
  }
  else {
    this.apiService.updateManageSections1(section, description,inactiveInd).subscribe(()=>{
      this.loadSections()
    })
    this.btnIndex =""
  }
  
}

  deleteRow(section:any){
    this.apiService.deleteManageSections(section).subscribe(()=>{
      this.loadSections()
    })
    this.btnIndex =""
  }

  cancelRow(){
    this.loadSections()
     this.btnIndex =""
  }
  
}
