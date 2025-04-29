import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-manage-doc-categories',
  templateUrl: './manage-doc-categories.component.html',
  styleUrls: ['./manage-doc-categories.component.css'],
})
export class ManageDocCategoriesComponent {
  DocCategories: any[] = [];
  btnIndex: any;
  clickFlag: boolean = false;
  saveNewDoc:boolean=false;
  dataFlag: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDocCategories();
  }

  loadDocCategories() {
    this.apiService.getDocCategories().subscribe((data) => {
      this.DocCategories = data;
      this.dataFlag = true;
    });
  }

  btnClick(index: any) {
    this.saveNewDoc = false
    this.btnIndex = index;
    this.clickFlag = true;
  }

  createRow() {
    this.saveNewDoc = true;
    this.DocCategories.push({ documentCatgCd: '', documentCatgDesc: '' , newRow:true});
  }

  saveRow(documentCatgCd: any, documentCatgDesc: string) {
    if(this.saveNewDoc){
    this.apiService
      .saveDocumentCategory(documentCatgCd, documentCatgDesc)
      .subscribe(() => {
        this.loadDocCategories();
      });
    this.btnIndex = '';
  }
  else {
    this.apiService
    .saveDocumentCategoryUpdate(documentCatgCd, documentCatgDesc)
    .subscribe(() => {
      this.loadDocCategories();
    });
  this.btnIndex = '';
  }
}

  deleteRow(section: any) {
    this.apiService.deleteDocumentCategory(section).subscribe(() => {
      this.loadDocCategories();
    });
    this.btnIndex = '';
  }

  cancelRow() {
    this.loadDocCategories();
    this.btnIndex = '';
  }
}
