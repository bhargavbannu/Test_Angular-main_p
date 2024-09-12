import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api ='api/search/documentSearch?start=0&size=10 '

  constructor( private http:HttpClient) { }



  postData(payload:any): Observable<any> {
    return this.http.post(this.api, payload);
    // const apiResponse = [
      
    //     {
    //         "docId": "28796727",
    //         "vendorDocRefNbr": "CG1093AD01 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "B757, B767",
    //         "subject": "INERTIAL REFERENCE MODE PANEL",
    //         "ata": "34-21-21",
    //         "esos": "CNCLD, ITAR, 10892, TESS",
    //         "detailDocTypes": "CMM/IPL, TR, SB, CMM",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "72",
    //         "documentPartNumbers": "CG1093AD01, CG1093AD02, CG1093AD03"
    //     },
    //     {
    //         "docId": "28796936",
    //         "vendorDocRefNbr": "381276-1 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "PNEU & SHAFT PWR GAS TURBINE",
    //         "ata": "49-21-83",
    //         "esos": "80250, CNCLD",
    //         "detailDocTypes": "TR, OM, SB",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "30",
    //         "documentPartNumbers": "305080-1, GTCP85-98DHF"
    //     },
    //     {
    //         "docId": "28796938",
    //         "vendorDocRefNbr": "GTCP85-98DHF - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "INSPECTION/REPAIR MANUAL",
    //         "ata": "49-21-73",
    //         "esos": "8303, CNCLD",
    //         "detailDocTypes": "TR, IRM",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "30",
    //         "documentPartNumbers": "GTCP 85 SERIES"
    //     },
    //     {
    //         "docId": "28796943",
    //         "vendorDocRefNbr": "204975 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "A300",
    //         "subject": "AIR CYCLE  MACHINE",
    //         "ata": "21-53-04",
    //         "esos": "CNCLD, 40650",
    //         "detailDocTypes": "CMM/IPL, SB, TR",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "45",
    //         "documentPartNumbers": "204975-8"
    //     },
    //     {
    //         "docId": "28796946",
    //         "vendorDocRefNbr": "V3900-11 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "SOLENOID SHUTOFF VALVE",
    //         "ata": "49-60-41",
    //         "esos": "CNCLD, 3735",
    //         "detailDocTypes": "OM",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "30",
    //         "documentPartNumbers": "V3900-11"
    //     },
    //     {
    //         "docId": "28796950",
    //         "vendorDocRefNbr": "103642-2 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "B757, B767",
    //         "subject": "CABIN PRESSURE RELIEF VALVE",
    //         "ata": "21-32-04",
    //         "esos": "TESS, CNCLD, 9157",
    //         "detailDocTypes": "CMM/IPL, TR, SB, CMM, SPB, SIL",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "40",
    //         "documentPartNumbers": "103642-2"
    //     },
    //     {
    //         "docId": "28796951",
    //         "vendorDocRefNbr": "105984-2 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "3 1/2 PNEUMATIC SHUTOFF VALVE",
    //         "ata": "30-10-06",
    //         "esos": "80015, CNCLD",
    //         "detailDocTypes": "OM, OM/IPL",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "47",
    //         "documentPartNumbers": "105984-2"
    //     },
    //     {
    //         "docId": "28796953",
    //         "vendorDocRefNbr": "108032 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "DIFFERENTIALPRESSURE REGULATOR",
    //         "ata": "49-50-07",
    //         "esos": "CNCLD, 3697",
    //         "detailDocTypes": "TR, OM, OM/IPL, CMM/IPL, SB",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "30",
    //         "documentPartNumbers": "108032"
    //     },
    //     {
    //         "docId": "28796960",
    //         "vendorDocRefNbr": "207640-32 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "MD80",
    //         "subject": "VANEAXIAL FAN",
    //         "ata": "21-26-01",
    //         "esos": "CNCLD, 6874",
    //         "detailDocTypes": "CMM, SB",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "40",
    //         "documentPartNumbers": "207640-32"
    //     },
    //     {
    //         "docId": "28796961",
    //         "vendorDocRefNbr": "121750-1 - NOT APPLICABLE",
    //         "vendorName": "HONEYWELL ",
    //         "effectivity": "A300, B767",
    //         "subject": "FLEXIBLE SHAFT ASSY",
    //         "ata": "78-31-20",
    //         "esos": "5827, TESS, CNCLD",
    //         "detailDocTypes": "TR, SPB, CMM/IPL, CMM, SB",
    //         "caseClasses": "REGULAR",
    //         "ecos": "",
    //         "engineeringSections": "44",
    //         "documentPartNumbers": "121248"
    //     }
    // ];
    // return of(apiResponse); 
  }
}
