import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ApiService } from 'src/app/api.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';


@Component({
  selector: 'app-view-route-child',
  templateUrl: './view-route-child.component.html',
  styleUrls: ['./view-route-child.component.css'],
  providers: [DatePipe],
})
export class ViewRouteChildComponent implements OnInit {
  viewRoute: any;
  routeData: any;
  edit: boolean = true;
  ClosedRoute:any;

  private ecoNum = new Subject<any>();
  private esoNum = new Subject<any>();

  ecoNumber: any;
  ecoRes: any[] = [];
  typedEsoNumber: any;
  esoNumberRess: any[] = [];
  disposition: any;
  dispositionValues: any[] = [];


  @ViewChild('calendar1') calendar1!: Calendar;

  constructor(private apiService: ApiService,  private router: Router, private datePipe: DatePipe, private route:ActivatedRoute) {}

  ngOnInit() {
    this.test();
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

          this.route.params.subscribe((params) => {
            this.ClosedRoute = params['ClosedRoute'];          
          });
  }

test(){
  this.apiService
  .viewRouteDetailApi(this.apiService.detailRoute)
  .subscribe((data) => {
    this.viewRoute = data.routeForm;

  });
}
  routee() {
    this.edit = false;
  }

  ecoNumb() {
    this.ecoNum.next(this.ecoNumber);
  }
  esoNumb() {
    this.esoNum.next(this.typedEsoNumber);
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
    if(this.typedEsoNumber && !this.viewRoute.route.esos.includes(this.typedEsoNumber)){
    this.viewRoute.route.esos.push(this.typedEsoNumber);
    this.typedEsoNumber = '';
    }
  }

  removeEso() {
    this.viewRoute.route.esos = [];
    this.typedEsoNumber = '';
  }

  addecoVal() {
    if (this.ecoNumber && !this.viewRoute.route.ecos.includes(this.ecoNumber)) {
      this.viewRoute.route.ecos.push(this.ecoNumber);
      this.ecoNumber = '';
    }
  }

  removeecoVal() { 
    this.viewRoute.route.ecos = [];
  }

  save() {

    if(this.viewRoute.route.closedate !== null && this.viewRoute.route.closedate !== undefined) {
      this.viewRoute.route.closedate= this.datePipe.transform(
        this.viewRoute.route.closedate,
        'MM/dd/yyyy HH:mm:ss'
      );
    }

    this.edit = true;
   

    const pay1 = 
    {
      "route": {
        "routeId": this.viewRoute.route.routeId,
        "detailId": this.viewRoute.route.detailId,
        "detailRefNbr":  this.viewRoute.route.detailRefNbr,
        "routeType":  this.viewRoute.route.routeType,
        "section": this.viewRoute.route.section,
        "routeDate": this.viewRoute.route.routeDate,
        "disposition": this.viewRoute.route.disposition,
        "closedate": this.viewRoute.route.closedate,
        "remark": this.viewRoute.route.remark,
        "esos": this.viewRoute.route.esos,
        "ecos":this.viewRoute.route.ecos,
      },
      "submitType": "edit"
    }
    
    
    this.apiService.saveExistingRouteView( this.viewRoute.route.routeId,pay1).subscribe((res)=>{
  
      this.router.navigate(['/viewDetail', { routeSaved: true }]);
    })
    // this.test();
   }

   onDispositionChange(disposition: any) {
    if (disposition.trim() !== '') {
      this.apiService.disposition(disposition).subscribe((res) => {
        this.dispositionValues = res;
      });
    } else {
      this.dispositionValues = [];
    }
  }

  selectValue(val: any) {
    this.viewRoute.route.disposition = val;
    this.dispositionValues = [];
  }

}
