import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-eso',
  templateUrl: './view-eso.component.html',
  styleUrls: ['./view-eso.component.css']
})
export class ViewEsoComponent {
  esoData:any;
  esoSaved: any;
  constructor(private apiService: ApiService, private route:ActivatedRoute){}

  ngOnInit() {
    this.loadEso();
    this.route.params.subscribe(params =>{
      this.esoSaved = params['esoSaved']
    })
  }

  loadEso() {
    this.apiService.viewEso().subscribe((data) => {
      this.esoData = data;
    });
  }
}
