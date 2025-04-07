import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-eso',
  templateUrl: './edit-eso.component.html',
  styleUrls: ['./edit-eso.component.css']
})
export class EditEsoComponent {
eso: any;

constructor(private apiService: ApiService){}
viewESO() {
  this.apiService.eso = this.eso
}

editESO(){
  this.apiService.eso = this.eso
}
  // Logic to view ESO

}
