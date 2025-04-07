import { Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-reissue-route',
  templateUrl: './reissue-route.component.html',
  styleUrls: ['./reissue-route.component.css']
})
export class ReissueRouteComponent {
DetailId: any;

@ViewChild('calendar1') calendar1!: Calendar;
@ViewChild('calendar2') calendar2!: Calendar;
routeDate: any;
closeDate: any;

save(){
  
}
}
