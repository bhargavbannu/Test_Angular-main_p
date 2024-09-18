import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-health-test',
  templateUrl: './health-test.component.html',
  styleUrls: ['./health-test.component.css']
})
export class HealthTestComponent {
  healthStatus: string = 'OK';
  apiHealthStatus: any = { status: 'loading' };

  constructor(
  
    private apiService: ApiService
  ) {
  }


  ngOnInit(): void {
    this.getApiHealthStatus();
  }
  getApiHealthStatus(): void {
    this.apiService.checkApiHealth().subscribe(status => {
      console.log(status);
      
      this.apiHealthStatus = status;
    });
  }
}
