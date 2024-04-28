import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  advancedSearchValue: any;
  documents = [
    { value: '', label: '' },
    { value: 'AA SB', label: 'AA SB' },
    { value: 'ACMM', label: 'ACMM' },
    { value: 'ACMM/IPL', label: 'ACMM/IPL' },
    { value: 'AIPC', label: 'AIPC' },
    { value: 'ALS', label: 'ALS' },
    { value: 'AMDT', label: 'AMDT' },
    { value: 'AMM', label: 'AMM' },
    { value: 'AMM/IPL', label: 'AMM/IPL' },
    { value: 'AMOC', label: 'AMOC' },
    { value: 'AOL', label: 'AOL' },
    { value: 'ASM', label: 'ASM' },
    { value: 'ATP', label: 'ATP' },
    { value: 'AWL', label: 'AWL' },
    { value: 'AWM', label: 'AWM' },
    { value: 'CDCCL', label: 'CDCCL' },
    { value: 'CESM', label: 'CESM' },
    { value: 'CIR', label: 'CIR' },
    { value: 'CMM', label: 'CMM' },
    { value: 'CMM V1A', label: 'CMM V1A' },
    { value: 'CMM VOL1', label: 'CMM VOL1' },
    { value: 'CMM VOL2', label: 'CMM VOL2' },
    { value: 'CMM VOL3', label: 'CMM VOL3' },
    { value: 'CMM/3D', label: 'CMM/3D' },
    { value: 'CMM/ATTA', label: 'CMM/ATTA' },
    { value: 'CMM/IPC', label: 'CMM/IPC' },
    { value: 'CMM/IPD', label: 'CMM/IPD' },
    { value: 'CMM/IPL', label: 'CMM/IPL' },
    { value: 'CMM/SUPP', label: 'CMM/SUPP' },
    { value: 'CMP', label: 'CMP' },
    { value: 'CMP/IPD', label: 'CMP/IPD' },
    { value: 'CMP/IPL', label: 'CMP/IPL' },
    { value: 'CMS', label: 'CMS' },
    { value: 'CN', label: 'CN' },
    { value: 'CPD', label: 'CPD' },
    { value: 'CRM', label: 'CRM' },
    { value: 'CRM/IPL', label: 'CRM/IPL' },
    { value: 'CSB', label: 'CSB' },
    { value: 'DEFAULT', label: 'DEFAULT' },
    { value: 'EM', label: 'EM' },
    { value: 'ESI', label: 'ESI' },
    { value: 'FP', label: 'FP' },
    { value: 'GPM', label: 'GPM' },
    { value: 'IC', label: 'IC' },
    { value: 'ICA', label: 'ICA' },
    { value: 'IN', label: 'IN' },
    { value: 'IPC', label: 'IPC' },
    { value: 'IPC VOL2', label: 'IPC VOL2' },
    { value: 'IPL', label: 'IPL' },
    { value: 'IRM', label: 'IRM' },
    { value: 'MCMM', label: 'MCMM' },
    { value: 'MM', label: 'MM' },
    { value: 'MM/IPC', label: 'MM/IPC' },
    { value: 'MM/IPL', label: 'MM/IPL' },
    { value: 'MSPM', label: 'MSPM' },
    { value: 'NSC', label: 'NSC' },
    { value: 'OIT', label: 'OIT' },
    { value: 'OM', label: 'OM' },
    { value: 'OM/IPC', label: 'OM/IPC' },
    { value: 'OM/IPL', label: 'OM/IPL' },
    { value: 'OPER/MM', label: 'OPER/MM' },
    { value: ' OPER/MM/IPL', label: ' OPER/MM/IPL' },
    { value: 'OPNC', label: 'OPNC' },
    { value: 'OSDPR', label: 'OSDPR' },
    { value: 'PL', label: 'PL' },
    { value: 'PMP', label: 'PMP' },
    { value: 'RIL', label: 'RIL' },
    { value: 'RM', label: 'RM' },
    { value: 'RS', label: 'RS' },
    { value: 'SB', label: 'SB' },
    { value: 'SDS', label: 'SDS' },
    { value: 'SIL', label: 'SIL' },
    { value: 'SL', label: 'SL' },
    { value: 'SMM', label: 'SMM' },
    { value: 'SNL', label: 'SNL' },
    { value: 'SOPM', label: 'SOPM' },
    { value: 'SOPM INTRO', label: 'SOPM INTRO' },
    { value: 'SOPM INTRODUCTION', label: 'SOPM INTRODUCTION' },
    { value: 'SPB', label: 'SPB' },

    { value: 'SPCL', label: 'SPCL' },
    { value: 'SPIB', label: 'SPIB' },
    { value: 'SPM', label: 'SPM' },
    { value: 'SRM', label: 'SRM' },
    { value: 'TB', label: 'TB' },
    { value: 'TEM', label: 'TEM' },
    { value: 'TG', label: 'TG' },
    { value: 'TIL', label: 'TIL' },
    { value: 'TN', label: 'TN' },
    { value: 'TR', label: 'TR' },
    { value: 'TSG', label: 'TSG' },
    { value: 'TSM', label: 'TSM' },
    { value: 'TV', label: 'TV' },
    { value: 'USERHBK', label: 'USERHBK' },
    { value: 'V12', label: 'V12' },
    { value: 'V22', label: 'V22' },
    { value: 'VOL 1', label: 'VOL 1' },
    { value: 'VOL 2', label: 'VOL 2' },
    { value: 'VOL 3', label: 'VOL 3' },
    { value: 'VSB', label: 'VSB' },
    { value: 'WISE', label: 'WISE' },
    { value: 'WSPG', label: 'WSPG' },
  ];
  constructor(private router: Router) {}

  ngOnInit() {
    this.advancedSearchValue = 'Advanced Search (Display)';
    this.router.navigateByUrl('/search');
  }

  advancedSearch() {
    if (this.advancedSearchValue === 'Advanced Search (Display)') {
      this.advancedSearchValue = 'Advanced Search (Hide)';
      this.router.navigateByUrl('/search/advance-search');
    } else {
      this.advancedSearchValue = 'Advanced Search (Display)';
      this.router.navigateByUrl('/search');
    }
  }
}
