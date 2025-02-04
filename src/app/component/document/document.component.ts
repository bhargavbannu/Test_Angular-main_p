import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
// import {
//   debounce,
//   debounceTime,
//   distinctUntilChanged,
//   from,
//   fromEvent,
//   Observable,
//   of,
//   Subject,
//   switchMap,
// } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers:[DatePipe]
})
export class DocumentComponent implements OnInit {
 
typedAuditable: any;


 
  //    [x: string]: any;
  // selectValue(item: any) {
  // this.selectedItem = item;
  // this.eccnLocationValue = item;
  // }
  // actVal(){
  // this.acVal=this.selectedItem
  // }
  // acVal:any
  //selectedItem:any
  //dropDownValues: any[] = [];
  // appi: any;
  // eccnLocationValue:any[]=[]
  // abhinayRes: any;
  //addDocType:any;
  // private sub = new Subject<any>();
  // private loc = new Subject<any>();
  // private ref = new Subject<any>();
  //EccnNumber: any;
  private ecoNum = new Subject<any>();
  private esoNum = new Subject<any>();
  private auditableSubject = new Subject<any>();
  category: any;
  remarksField: any;
  docSection: any;
  nextRoute: any;
  vendorName: any;
  eccnLocation: any[]=[];
  eccnNumber: any[]=[];
  allSelectedDocTypes: any[] = [];
  eccnNumbers: any[] = [];
  eccnLocations: any[] = [];
  audDocTypes: any[] = [];
  typedLocation: any;
  typedNumber: any;
  typedDocType: any;
  selectedLocation: any;
  selectedNumber: any;
  selectedDocType: any;
  selectedesoNum: any;

  filteredLocations: string[] = [];
  filteredNumbers: any[] = [];
  filteredDocTypes: any[] = [];
  removedDoc: any;
  ecoNumber: any;
  ecoRes: any[] = [];
  addedVal: any[]=[];
  typedEsoNumber: any;
  esoNumberRess: any[] = [];
  selectedEsoNumber: any[]=[];
  auditableResponse:any[]=[]
  dropDownAuditbale: any;
  addedValDoc: any[]=[];
  vendorEmail: any;
  vendorContactPerson: any;
  vendorContactNumber: any;
  vendorWebsite: any;
  vendorRemark: any;
  vendorDocRef: any;
  docEffectivity:any;
  documentSubject: any;
ata: any;
reissueDate: any;
 formattedDate:any;
  constructor(private apiService: ApiService, private http: HttpClient, private router:Router, private datePipe:DatePipe) {}

  
  ngOnInit() {
    // this.sub
    //   .pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     switchMap(() => {
    //       return this.apiService.eccnNumber(this.EccnNumber);
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

    //   this.loc.pipe(
    //     debounceTime(100),
    //     distinctUntilChanged(),
    //     switchMap(()=> { return this.apiService.eccnLocation(this.eccnLocationValue)})
    //   ).subscribe((res)=>{
    //     console.log(res);
    //     this.abhinayRes=res

    //   })

    // this.ref.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap(()=>{
    //     return this.apiService.audDocType(this.addDocType)
    //   })

    // ).subscribe((res)=>{
    //   console.log(res);

    // })
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy HH:mm:ss')

    this.auditableSubject.pipe(
      switchMap(()=>{
        return this.apiService.auditableService(this.typedAuditable)
      })
    ).subscribe((res)=>{
     this.auditableResponse = res
      
    })

    this.ecoNum
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {
          return this.apiService.ecoNumbers(this.ecoNumber);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.ecoRes = res;
      });

    this.esoNum
      .pipe(
        switchMap(() => {
          debounceTime(1000), distinctUntilChanged();
          return this.apiService.esoNumbersApiData(this.typedEsoNumber);
        })
      )
      .subscribe((res) => {
        console.log(res);
        
        this.esoNumberRess = res;
      });
    this.apiService.eccnNumber().subscribe((data) => {
      this.eccnNumbers = data;
    });

    this.apiService.eccnLocation().subscribe((data) => {
      this.eccnLocations = data;
    });

    this.apiService.audDocType().subscribe((data) => {
      this.audDocTypes = data;
    });
  }
auditableDropDownSelect(doc:any){
  // this.addedValDoc = doc;
  this.typedAuditable = doc;
  this.auditableResponse = []

}

onAddDoc(){
    if(this.typedAuditable && !this.addedValDoc.includes(this.typedAuditable)){
  this.addedValDoc.push(this.typedAuditable);
  this.typedAuditable=''
    }
}

removeDoc(){
  this.addedValDoc=[]
}

  auditNext(){
    this.auditableSubject.next(this.typedAuditable)
  }
  ecoNumb() {
    this.ecoNum.next(this.ecoNumber);
  }
  esoNumb() {
    this.esoNum.next(this.typedEsoNumber);
  }

  addDocumentSubmit() {
   
    // const payload = {
    //   document: {
    //     vendor: {
    //       vendorNm: this.val,
    //       vendorWebsite: this.vendorEmail,
    //     },
    //     sections: this.docSection,
    //     creationDate: '11/21/2024 11:30:00',
    //     documentCategory: this.valueD,
    //     remarks: this.remarksField,
    //     nextRouteType: this.nextRoute,
    //   },
    // };
    const payload = {
      "document": {
        "vendor": {        
         "vendorNm": this.vendorName,
        "vendorWebsite":this.vendorWebsite,
        "contactPerson":this.vendorContactPerson,
        "contactPhone":this.vendorContactNumber,
        "vendorEmailAddress":this.vendorEmail,
        "remarks":this.vendorRemark        
        },
        "sections": this.docSection,
        "vendorDocRefNbr":this.vendorDocRef,
        "effectivityIds":this.docEffectivity,
        "ata":this.ata,
        "subject":this.documentSubject,
        "reissueDate":this.reissueDate,
        "creationDate": this.formattedDate,
        "documentCategory": this.category,
        "remarks": this.remarksField,
        "nextRouteType": this.nextRoute,
        "itar":"NO",
        "eccnNumber":this.eccnNumber,
        "eccnLocation":this.eccnLocation,
        "auditableDocTypes":this.addedValDoc,
        "esos":this.selectedEsoNumber,
        "ecos":this.addedVal
      },
      "submitType": "ADD"
    }
    this.apiService.addDocument(payload).subscribe((res: any) => {
      this.apiService.viewDocId = res.returnObject.documentNbr;
      this.router.navigate(["/viewStatus", {docAdded:true}])
    });
  }

  filterLocations(value: string) {
    if (value !== '') {
      this.filteredLocations = this.eccnLocations.filter((location) =>
        location.toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      this.filteredLocations = [];
    }
  }
  filterNumbers(value: any) {
    if (value) {
      this.filteredNumbers = this.eccnNumbers.filter((number) =>
        number.toString().toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      this.filteredNumbers = [];
    }
  }
  filterDocTypes(value: any) {
    if (value) {
      this.filteredDocTypes = this.audDocTypes.filter((doc) =>
        doc.toString().toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      this.filteredDocTypes = [];
    }
  }


  selectDocType(doc: any) {
    this.selectedDocType = doc;
    this.typedDocType = doc;
    this.filteredDocTypes = [];
  }

  


  selectLocation(location: string) {
    this.selectedLocation = location;
    this.typedLocation = location;
    this.filteredLocations = [];
  }
  selectNumber(number: any) {
    this.selectedNumber = number;
    this.typedNumber = number;
    this.filteredNumbers = [];
  }
  
  selectesoNum(doc: any) {
    this.ecoNumber = doc;
    this.ecoRes = [];
  }
  selectesoNum1(doc: any) {
    this.typedEsoNumber = doc;
    this.esoNumberRess = [];
  }

  addEsoNum() {
    if(this.typedEsoNumber && !this.selectedEsoNumber.includes(this.typedEsoNumber)){
    this.selectedEsoNumber.push(this.typedEsoNumber);
    this.typedEsoNumber = '';
    }
  }

  removeEso() {
    this.selectedEsoNumber = [];
    this.typedEsoNumber = '';
  }
  addLocation() {
    if (this.selectedLocation && !this.eccnLocation.includes(this.selectedLocation)) {
      this.eccnLocation.push(this.selectedLocation);
      this.selectedLocation = '';
      this.typedLocation = '';
    }
  }
  addNumber() {
    if (this.selectedNumber && !this.eccnNumber.includes(this.selectedNumber)) {
      this.eccnNumber.push(this.selectedNumber);
      this.selectedNumber = '';
      this.typedNumber = '';
    }
  }

  addecoVal() {
    if (this.ecoNumber && !this.addedVal.includes(this.ecoNumber)) {
      this.addedVal.push(this.ecoNumber);
      this.ecoNumber = '';
    }
  }

  removeecoVal() { 
    this.addedVal = [];
  }

  addDocType() {
    if (
      this.selectedDocType &&
      !this.allSelectedDocTypes.includes(this.selectedDocType)
    ) {
      this.allSelectedDocTypes.push(this.selectedDocType);
      this.selectedDocType = '';
      this.typedDocType = '';
    }
  }
  removeLocation() {
    this.eccnLocation = [];
  }
  removeNumber() {
    this.eccnNumber = [];
  }
  removeDocType() {
    if(this.removedDoc !==undefined){
    const index = Object.values(this.allSelectedDocTypes).indexOf(
      this.removedDoc[0]
    );
    if (index !== -1) {
      this.allSelectedDocTypes.splice(index, 1);
    }
  }
  }
}
