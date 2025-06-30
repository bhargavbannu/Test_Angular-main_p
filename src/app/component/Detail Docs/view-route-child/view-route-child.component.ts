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
  ClosedRoute: any;

  private ecoNum = new Subject<any>();
  private esoNum = new Subject<any>();

  ecoNumber: any;
  ecoRes: any[] = [];
  typedEsoNumber: any;
  esoNumberRess: any[] = [];
  esoNumArray: any[] = [];
  disposition: any;
  dispositionValues: any[] = [];

  @ViewChild('calendar1') calendar1!: Calendar;
  searchType!: string;
  routeEsos: any;
  routeEcos:any;
  esoValues: any;
  selEsoValue: any;
  selectedEsoNumberArr: any[]=[];
  selectedEsoNumber: any[]=[];
  selectedEcoNumberArr: any[]=[];
  selectedEcoNumber: any[]=[];
  existRouteSaved: any;
  dropDownValues: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchType = this.apiService.searchType;
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
      

        this.esoNumberRess = res;
        this.esoNumArray = res;
        this.dropDownValues = res;
      });

    this.route.params.subscribe((params) => {
      this.ClosedRoute = params['ClosedRoute'];
      this.existRouteSaved = params['existRouteSaved'];
    });
  }

  test() {
    this.apiService
      .viewRouteDetailApi(this.apiService.detailRoute)
      .subscribe((data) => {
        this.viewRoute = data.routeForm;
        this.routeEsos = data.routeEsos;
        this.routeEcos = data.routeEcos;
        // this.selectedEsoNumber = this.viewRoute.route.esos;
        // this.selectedEsoNumberArr = this.viewRoute.route.esos;
        //this.selectedEcoNumber = this.viewRoute.route.ecos;
        //   this.selectedEcoNumberArr = this.viewRoute.route.ecos;
        if(this.viewRoute.route.esos !== null && this.viewRoute.route.esos !== undefined){
          this.selectedEsoNumber =  this.viewRoute.route.esos?.map(
          (res: any) => res
        );
          this.selectedEsoNumberArr =  this.viewRoute.route.esos?.map(
          (res: any) => res
        );
      }
      if(this.viewRoute.route.ecos !== null && this.viewRoute.route.ecos !== undefined){
        this.selectedEcoNumber =  this.viewRoute.route.ecos?.map(
          (res: any) => res
        );
         this.selectedEcoNumberArr =  this.viewRoute.route.ecos?.map(
          (res: any) => res
        );
      }
        this.viewRoute.route.closedate = this.datePipe.transform(
          this.viewRoute?.route?.closedate,
          'MM/dd/yyyy'
        );
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
 
      if (this.esoNumArray.includes(this.typedEsoNumber)) {
        if (
          this.typedEsoNumber &&
          !this.selectedEsoNumber.includes(this.typedEsoNumber)
        ) {
          this.selectedEsoNumber.push(this.typedEsoNumber);
          this.typedEsoNumber = '';
        }
      } else {
        alert('Not an active ESO.');
      }
 
}
  removeEso() {
    // this.viewRoute.route.esos = [];
    // this.typedEsoNumber = '';
    if (this.selectedEsoNumberArr !== undefined) {
      this.selectedEsoNumber = this.selectedEsoNumber.filter(
        (val: any) => !this.selectedEsoNumberArr.includes(val)
      );
    }
  }

  addecoVal() {
    // if (this.ecoNumber && !this.viewRoute.route.ecos.includes(this.ecoNumber)) {
    //   this.viewRoute.route.ecos.push(this.ecoNumber);
    //   this.ecoNumber = '';
    // }
    if (this.ecoNumber && !this.selectedEcoNumber.includes(this.ecoNumber)) {
      this.selectedEcoNumber.push(this.ecoNumber);
      this.ecoNumber = '';
    }
  }

  removeecoVal() {
    // this.viewRoute.route.ecos = [];
    if (this.selectedEcoNumberArr !== undefined) {
      this.selectedEcoNumber = this.selectedEcoNumber.filter(
        (val: any) => !this.selectedEcoNumberArr.includes(val)
      );
    }
  }

  save() {
    let closedate = this.datePipe.transform(
      this.viewRoute?.route?.closedate,
      'MM/dd/yyyy HH:mm:ss'
    );

    this.edit = true;

    const pay1 = {
      route: {
        routeId: this.viewRoute.route.routeId,
        detailId: this.viewRoute.route.detailId,
        detailRefNbr: this.viewRoute.route.detailRefNbr,
        routeType: this.viewRoute.route.routeType,
        section: this.viewRoute.route.section,
        routeDate: this.viewRoute.route.routeDate,
        disposition: this.viewRoute.route.disposition,
        closedate: closedate,
        remark: this.viewRoute.route.remark,
        esos: this.selectedEsoNumber,
        ecos: this.selectedEcoNumber,
      },
      submitType: 'edit',
    };

    this.apiService
      .saveExistingRouteView(this.viewRoute.route.routeId, pay1)
      .subscribe((res) => {
        this.router.navigate(['/viewRoute', { existRouteSaved: true }]);
      });
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

  btdetailpop() {
    this.apiService.popno = this.viewRoute.route.detailId;
    this.router.navigate(['/viewDetail', { fromViewRoute: true }]);
  }

  viewEso(eso: any) {
    this.apiService.eso = eso;
    this.router.navigate(['/view-eso', { fromViewRoute: true }]);
  }

  deleteRoute() {
    const payload = {
      route: {
        routeId: this.viewRoute.route.routeId,
        detailId: this.viewRoute.route.detailId,
        detailRefNbr: this.viewRoute.route.detailRefNbr
      },
      submitType: 'edit'
    };
    this.apiService.deleteRoute(payload).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/viewDetail', { routeDeleted: true }]);
      }
    });
  }

  formatDate1(date: Date) {
    this.viewRoute.route.closedate = this.datePipe.transform(
      date,
      'MM/dd/yyyy'
    );
  }

  onFocusOut() {
    this.esoNumberRess = [];
    this.ecoRes = [];
  }
}
