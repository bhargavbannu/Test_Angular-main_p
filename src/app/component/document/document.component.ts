import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [DatePipe],
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
  eccnLocation: any[] = [];
  eccnNumber: any[] = [];
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
  documentSection: any[] = [];
  searchEffetivity: any;
  filteredLocations: string[] = [];
  filteredNumbers: any[] = [];
  filteredDocTypes: any[] = [];
  removedDoc: any;
  ecoNumber: any;
  ecoRes: any[] = [];
  addedVal: any[] = [];
  typedEsoNumber: any;
  esoNumberRess: any[] = [];
  esoNumArray: any[] = [];
  selectedEsoNumber: any[] = [];
  auditableResponse: any[] = [];
  dropDownAuditbale: any;
  addedValDoc: any[] = [];
  vendorEmail: any;
  vendorContactPerson: any;
  vendorContactNumber: any;
  vendorWebsite: any;
  vendorRemark: any;
  vendorDocRef: any;
  docEffectivity: any;
  documentSubject: any;
  ata: any;
  reissueDate: any;
  formattedDate: any;
  editDoc: any;
  documentsDetails: any;
  ITAR: any;

  @ViewChild('calendar1') calendar1!: Calendar;
  @ViewChild('calendar2') calendar2!: Calendar;
  creationDate: any;
  vendorSub = new Subject();
  vendorNamesList: any[] = [];
  showVendorErr: boolean = false;
  showSubErr: boolean = false;
  addedValDoc12: any;
  addedValEco: any;
  selectedEsoNumberArr: any;  
  selEccnNumber: any;
  selEccnLocation: any;
  docId: any;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
 
    this.nextRoute = 'ETDT';
    this.category = '--        ';
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy HH:mm:ss');
    if (
      this.reissueDate !== null &&
      this.reissueDate !== undefined &&
      this.reissueDate !== 'null'
    ) {
      this.reissueDate = this.datePipe.transform(
        this.reissueDate,
        'MM/dd/yyyy'
      );
    }

    this.vendorSub
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {
          return this.apiService.getAutoPopulateVendors(this.vendorName);
        })
      )
      .subscribe((res: any) => {
        this.vendorNamesList = res;
        if (this.vendorName === '') {
          this.vendorNamesList = [];
        }
        if (
          this.vendorNamesList.length > 0 &&
          this.vendorNamesList.some(
            (item) =>
              item.trim().toLowerCase() === this.vendorName.trim().toLowerCase()
          )
        ) {
          const payload = {
            vendor: {
              vendorNm: this.vendorName,
            },
          };
          this.apiService.addDocvendorDetails(payload).subscribe((res: any) => {
            if (res) {
              this.vendorEmail = res.vendorEmailAddress;
              this.vendorContactPerson = res.contactPerson;
              this.vendorContactNumber = res.contactPhone;
              this.vendorWebsite = res.vendorWebsite;
              this.vendorRemark = res.remarks;
            }
          });
        } else {
          this.vendorEmail = '';
          this.vendorContactPerson = '';
          this.vendorContactNumber = '';
          this.vendorWebsite = '';
          this.vendorRemark = '';
        }
      });

    this.auditableSubject
      .pipe(
        switchMap(() => {
          return this.apiService.auditableService(this.typedAuditable);
        })
      )
      .subscribe((res) => {
        this.auditableResponse = res;
        if (this.typedAuditable === '') {
          this.auditableResponse = [];
        }
      });
  
    this.ecoNum
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => {
          if (this.ecoNumber !== '') {
            return this.apiService.ecoNumbers(this.ecoNumber);
          } else {
            return (this.ecoRes = []);
            // Return an empty observable or a default value
          }
        })
      )
      .subscribe((res) => {
        this.ecoRes = res;
      });    

    this.esoNum
      .pipe(        
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap(() => {
          return this.apiService.esoNumbersApiData(this.typedEsoNumber);
        })
      )
      .subscribe((res) => {
        this.esoNumberRess = res;
        this.esoNumArray = res;
        if (this.typedEsoNumber === '') {
          this.esoNumberRess = [];
        }
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

    this.apiService.getDocumentSection().subscribe((data) => {
      this.documentSection = data;
    });

    this.apiService.getSearchEffetivity().subscribe((data) => {
      this.searchEffetivity = data;
    });

    this.route.params.subscribe((params) => {
      this.editDoc = params['editDoc'];
    });

    if (this.editDoc) {
      this.apiService.viewDocuments().subscribe((data) => {
        this.documentsDetails = data;
         this.docId = this.documentsDetails.document?.documentNbr;
        this.creationDate = this.datePipe.transform(
          this.documentsDetails.document?.creationDate,
          'MM/dd/yyyy'
        );
        this.vendorName = this.documentsDetails.document?.vendor.vendorNm;
        this.vendorWebsite =
          this.documentsDetails.document?.vendor.vendorWebsite;
        this.vendorContactPerson =
          this.documentsDetails.document?.vendor.contactPerson;
        this.vendorContactNumber =
          this.documentsDetails.document?.vendor.contactPhone;
        this.vendorEmail =
          this.documentsDetails.document?.vendor.vendorEmailAddress;
        this.vendorRemark = this.documentsDetails.document?.vendor.remarks;
        this.docSection = this.documentsDetails.document?.sections;
        this.vendorDocRef = this.documentsDetails.document?.vendorDocRefNbr;
        this.docEffectivity = this.documentsDetails.document?.effectivityIds;
        this.ata = this.documentsDetails.document?.ata;
        this.documentSubject = this.documentsDetails.document?.subject;
        this.reissueDate = this.documentsDetails.document?.reissueDate;
        this.formattedDate = this.documentsDetails.document?.creationDate;
        this.category = this.documentsDetails.document?.documentCategory;
        this.remarksField = this.documentsDetails.document?.remarks;
        this.nextRoute = this.documentsDetails.document?.nextRouteType;
        this.eccnNumber = this.documentsDetails.document?.eccnNumber;
        this.selEccnNumber = this.documentsDetails.document?.eccnNumber;
        this.eccnLocation = this.documentsDetails.document?.eccnLocation;
        this.selEccnLocation = this.documentsDetails.document?.eccnLocation;
        this.addedValDoc = this.documentsDetails.document?.auditableDocTypes;
        this.addedValDoc12 = this.documentsDetails.document?.auditableDocTypes;
        this.addedVal = this.documentsDetails.documentEcos?.map(
          (res: any) => res.eco
        );
        this.addedValEco = this.documentsDetails.documentEcos?.map(
          (res: any) => res.eco
        );
        this.selectedEsoNumber = this.documentsDetails.documentEsos.map(
          (res: any) => res.eso
        );
        this.selectedEsoNumberArr = this.documentsDetails.documentEsos.map(
          (res: any) => res.eso
        );
        this.allSelectedDocTypes =
          this.documentsDetails.document?.documentPartNumbers;
        this.removedDoc = this.documentsDetails.document?.documentPartNumbers;
        this.formattedDate = this.datePipe.transform(
          this.formattedDate,
          'MM/dd/yyyy HH:mm:ss'
        );
        if (
          this.reissueDate !== null &&
          this.reissueDate !== undefined &&
          this.reissueDate !== 'null'
        ) {
          this.reissueDate = this.datePipe.transform(
            this.reissueDate,
            'MM/dd/yyyy'
          );
        }
      });
    }
  }
  auditableDropDownSelect(doc: any) {
    // this.addedValDoc = doc;
    this.typedAuditable = doc;
    this.auditableResponse = [];
  }

  onAddDoc() {
    if (
      this.typedAuditable &&
      !this.addedValDoc.includes(this.typedAuditable)
    ) {
      this.addedValDoc.push(this.typedAuditable);
      this.typedAuditable = '';
      console.log(this.addedValDoc);
    }
  }


  auditNext() {
    this.auditableSubject.next(this.typedAuditable);
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
    if (
      this.reissueDate !== null &&
      this.reissueDate !== undefined &&
      this.reissueDate !== 'null'
    ) {
      this.reissueDate = this.datePipe.transform(
        this.reissueDate,
        'MM/dd/yyyy HH:mm:ss'
      );
    }

    let newSection = this.docSection?.map((sec: any) => sec.split(' - ')[0]);

    let payload;
  if (!this.editDoc) {
      payload = {
        document: {
          vendor: {
            vendorNm: this.vendorName,
            vendorWebsite: this.vendorWebsite,
            contactPerson: this.vendorContactPerson,
            contactPhone: this.vendorContactNumber,
            vendorEmailAddress: this.vendorEmail,
            remarks: this.vendorRemark,
          },
          sections: newSection,
          vendorDocRefNbr: this.vendorDocRef,
          documentPartNumbers: this.allSelectedDocTypes,
          effectivityIds: this.docEffectivity,
          ata: this.ata,
          subject: this.documentSubject,
          reissueDate: this.reissueDate,
          creationDate: this.formattedDate,
          documentCategory: this.category,
          remarks: this.remarksField,
          nextRouteType: this.nextRoute,
          itar: 'NO',
          eccnNumber: this.eccnNumber,
          eccnLocation: this.eccnLocation,
          auditableDocTypes: this.addedValDoc,
          esos: this.selectedEsoNumber,
          ecos: this.addedVal,
        },
        submitType: 'ADD',
      };
    } else {
      this.creationDate = this.datePipe.transform(    
        this.creationDate,
        'MM/dd/yyyy HH:mm:ss'
      );
    payload = {
        document: {
          documentNbr: this.docId,
          vendor: {
            vendorNm: this.vendorName,
            vendorWebsite: this.vendorWebsite,
            contactPerson: this.vendorContactPerson,
            contactPhone: this.vendorContactNumber,
            vendorEmailAddress: this.vendorEmail,
            remarks: this.vendorRemark,
          },
          sections: newSection,
          vendorDocRefNbr: this.vendorDocRef,
          documentPartNumbers: this.allSelectedDocTypes,
          effectivityIds: this.docEffectivity,
          ata: this.ata,
          subject: this.documentSubject,
          reissueDate: this.reissueDate,
          creationDate: this.creationDate,
          documentCategory: this.category,
          remarks: this.remarksField,
          nextRouteType: this.nextRoute,
          itar: 'NO',
          eccnNumber: this.eccnNumber,
          eccnLocation: this.eccnLocation,
          auditableDocTypes: this.addedValDoc,
          esos: this.selectedEsoNumber,
          ecos: this.addedVal,
        },
        submitType: 'ADD',
    };
  }
    this.apiService.addDocument(payload).subscribe((res: any) => {
      if (res) {
        this.apiService.viewDocId = res.returnObject.documentNbr;
        this.apiService.vendorName = this.vendorName;
        this.apiService.subject = this.documentSubject;
        this.router.navigate(['/viewStatus', { docAdded: true }]);
      }
    });
    if (
      this.vendorName === null ||
      this.vendorName === undefined ||
      this.vendorName === ''
    ) {
      this.showVendorErr = true;
      this.showSubErr = false;
    } else if (
      this.vendorName !== null &&
      this.vendorName !== undefined &&
      this.vendorName !== '' &&
      (this.docSection === null ||
        this.docSection === undefined ||
        this.docSection === '' ||
        this.docSection.length === 0)
    ) {
      this.showSubErr = true;
      this.showVendorErr = false;
    } else {
      this.showSubErr = false;
      this.showVendorErr = false;
    }
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
    if(this.esoNumArray.includes(this.typedEsoNumber)){
    if (
      this.typedEsoNumber &&
      !this.selectedEsoNumber.includes(this.typedEsoNumber)
    ) {
      this.selectedEsoNumber.push(this.typedEsoNumber);
      this.typedEsoNumber = '';
    }
  } else {
    let confirm = window.confirm("The specified ESO doesn't exist. Would you like to create it?");
    if(confirm){ 
      window.open('/Add-ESO-popup?eso='+this.typedEsoNumber, '_blank', 'width=600,height=400,left=200,top=100');
      }

       (window as any).setEsoNmbr = (esoNum:any)=>{
            this.selectedEsoNumber.push(esoNum);
            this.typedEsoNumber = ''
            this.cdr.detectChanges();
           }
    }
  }

  
  addLocation() {
    if (this.typedLocation && !this.eccnLocation.includes(this.typedLocation)) {
      this.eccnLocation[0] = this.typedLocation;
      this.selectedLocation = '';
      this.typedLocation = '';
    }
  }
  addNumber() {
    if (this.typedNumber && !this.eccnNumber.includes(this.typedNumber)) {
      this.eccnNumber[0] = this.typedNumber;
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

  addDocType() {
    if (
      this.typedDocType &&
      !this.allSelectedDocTypes.includes(this.typedDocType)
    ) {
      this.allSelectedDocTypes.push(this.typedDocType);
      this.selectedDocType = '';
      this.typedDocType = '';
      console.log(this.allSelectedDocTypes);
    }
  }
  removeLocation() {
    this.eccnLocation = [];
  }
  removeNumber() {
    this.eccnNumber = [];
  }
  removeDocType() {
    if (this.removedDoc !== undefined) {
      this.allSelectedDocTypes = this.allSelectedDocTypes.filter(
        (val) => !this.removedDoc.includes(val)
      );
    }
  }

  removeecoVal() {
    if (this.addedValEco !== undefined) {
      this.addedVal = this.addedVal.filter(
        (val) => !this.addedValEco.includes(val)
      );
    }
  }
    
  removeEso() {
    if (this.selectedEsoNumberArr !== undefined) {
      this.selectedEsoNumber = this.selectedEsoNumber.filter(
        (val) => !this.selectedEsoNumberArr.includes(val)
      );
    } 
  }
    
    
  removeDoc() {
    if( this.addedValDoc12 !== undefined){
      this.addedValDoc = this.addedValDoc.filter(
        val => !this.addedValDoc12.includes(val)
      );
    }
  }

  onFocusOut() {
    this.filteredLocations = [];
    this.filteredNumbers = [];
    this.filteredDocTypes = [];
    this.esoNumberRess = [];
    this.ecoRes = [];
    this.auditableResponse = [];
    this.vendorNamesList = [];
  }

  vName(val: any) {
    this.vendorSub.next(val.target.value);

    if (val.target.value === '') {
      this.vendorNamesList = [];
    }
  }

  setVal(val: any){
    this.vendorName = val;
      const payload = {
        vendor: {
          vendorNm: this.vendorName,
        },
      };
      this.apiService.addDocvendorDetails(payload).subscribe((res: any) => {
        if (res) {
          this.vendorEmail = res.vendorEmailAddress;
          this.vendorContactPerson = res.contactPerson;
          this.vendorContactNumber = res.contactPhone;
          this.vendorWebsite = res.vendorWebsite;
          this.vendorRemark = res.remarks;
        }
      });
    this.vendorNamesList = [];
  }

  deleteDocument() {
    this.apiService.deleteDocument().subscribe((res) => {
      if (res) {
        this.router.navigate(['/search', { docDeleted: true }]);
      }
    })
  }

  formatDate(date: Date) {
    this.creationDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }

  formatDate1(date: Date) {
    this.reissueDate = this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
