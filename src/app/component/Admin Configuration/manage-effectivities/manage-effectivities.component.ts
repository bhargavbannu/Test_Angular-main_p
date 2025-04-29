import { Component, OnInit,OnChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-manage-effectivities',
  templateUrl: './manage-effectivities.component.html',
  styleUrls: ['./manage-effectivities.component.css']
})
export class ManageEffectivitiesComponent {
  Effectivities: any[]=[];
  btnIndex: any;
  dataFlag: boolean = false;
  clickFlag: boolean = false
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.loadEffectivities(); 
    console.log(this.Effectivities);  
  }


  loadEffectivities(){
    this.apiService.getEffectivites().subscribe(data =>{
      this.Effectivities = data;  
      this.dataFlag = true;
    })

  }

  btnClick(index: any){
    this.btnIndex = index
    this.clickFlag = true  
  }


  createRow(){  
    this.Effectivities.push({effectivityId:"",effectivityFleet:{esoMinSeqNbr:"",
      esoMaxSeqNbr:"",esoCurrSeqNbr:""}, inactiveInd:"", newRow:true})
    
}

saveRow(effectivityId:any, esoMinSeqNbr:string, esoMaxSeqNbr:string,esoCurrSeqNbr:any,inactiveInd:any){
  this.apiService.saveEffectivity(effectivityId,esoMinSeqNbr,esoMaxSeqNbr,esoCurrSeqNbr,inactiveInd).subscribe(()=>{
    this.loadEffectivities()
  })
  this.btnIndex =""
}

deleteRow(effectivityId:any){
  this.apiService.deleteEffectivity(effectivityId).subscribe(()=>{
    this.loadEffectivities()
  })
  this.btnIndex =""
}

cancelRow(){
  this.loadEffectivities()
   this.btnIndex =""
}

}
