import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
valueD: any;
remarksField: any;
docSection: any;
nextRoute: any;
  constructor(private apiService: ApiService) {}
  val:any;
  ngOnInit() {
    this.addDocumentSubmit();
    console.log(this.valueD);
    
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
    this.apiService.addDocument(payload).subscribe((res:any) => {
      console.log(res);
    });
  }
}
