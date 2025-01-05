import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
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
  valueD: any;
  remarksField: any;
  docSection: any;
  nextRoute: any;
  val: any;
  eccnLocation:any;
  eccnNumber:any;
  allSelectedDocTypes:any[]=[];
  eccnNumbers: any[] = []
  eccnLocations: any[] = []
  audDocTypes: any[] = []
  typedLocation:any;
  typedNumber:any;
  typedDocType:any;
  selectedLocation:any
  selectedNumber:any;
  selectedDocType:any;
  filteredLocations:string[]=[];
  filteredNumbers:any[]=[];
  filteredDocTypes:any[]=[];
  removedDoc:any;
  constructor(private apiService: ApiService, private http: HttpClient) {}
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
  addDocumentSubmit() {
    const payload = {
      document: {
        vendor: {
          vendorNm: this.val,
        },
        sections: this.docSection,
        creationDate: '11/21/2024 11:30:00',
        documentCategory: this.valueD,
        remarks: this.remarksField,
        nextRouteType: this.nextRoute,
      },
    };
    this.apiService.addDocument(payload).subscribe((res: any) => {
      console.log(res);
    });
  }

 
  // eccn() {
  //   this.sub.next(this.EccnNumber);
  // }

  // loct(){
  //   this.loc.next(this.eccnLocationValue)
  // }
  // addDoc(){
  //   this.ref.next(this.addDocType)
  // }
  filterLocations(value:string){
    if(value !==''){
    this.filteredLocations= this.eccnLocations.filter(location=> location.toLowerCase().startsWith(value.toLowerCase()));
    }
    else {
      this.filteredLocations=[];
    }
  }
  filterNumbers(value:any){
    if(value){
    this.filteredNumbers= this.eccnNumbers.filter(number=> number.toString().toLowerCase().startsWith(value.toLowerCase()));
    }
    else {
      this.filteredNumbers=[];
    }
  }
  filterDocTypes(value:any){
    if(value){
    this.filteredDocTypes= this.audDocTypes.filter(doc=> doc.toString().toLowerCase().startsWith(value.toLowerCase()));
    }
    else {
      this.filteredDocTypes=[];
    }
  }
  selectLocation(location:string){
    this.selectedLocation=location;
    this.typedLocation=location;
    this.filteredLocations=[];
  }
  selectNumber(number:any){
    this.selectedNumber=number;
    this.typedNumber=number;
    this.filteredNumbers=[];
  }
  selectDocType(doc:any){
    this.selectedDocType=doc;
    this.typedDocType=doc;
    this.filteredDocTypes=[];
  }
  addLocation(){
    if(this.selectedLocation){
    this.eccnLocation= this.selectedLocation;
    this.selectedLocation="";
    this.typedLocation="";
    }
  }
  addNumber(){
    if(this.selectedNumber){
    this.eccnNumber= this.selectedNumber;
    this.selectedNumber="";
    this.typedNumber="";
    }
  }
  addDocType(){
    if(this.selectedDocType && !this.allSelectedDocTypes.includes(this.selectedDocType)){
    this.allSelectedDocTypes.push(this.selectedDocType);
    this.selectedDocType="";
    this.typedDocType="";
    }
  }
  removeLocation(){
    this.eccnLocation = "";
  }
  removeNumber(){
    this.eccnNumber = "";
  }
  removeDocType(){
    const index = Object.values(this.allSelectedDocTypes).indexOf(this.removedDoc[0]);
    if (index !== -1) {
      this.allSelectedDocTypes.splice(index, 1);
    }
  }
}
