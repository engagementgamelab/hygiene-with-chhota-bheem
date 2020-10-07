import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit, AfterViewInit {

  public content: any;
  public isPhone: boolean;
  public hasContent: boolean;

  public useHindi: boolean;

  constructor(private _dataSvc: DataService) { }

  async ngOnInit() {
  
    this.useHindi = this._dataSvc.currentLang.value === 'hi';
    this._dataSvc.currentLang.subscribe((val) => {
      this.useHindi = val === 'hi';
    });

    const response = await this._dataSvc.getDataForUrl('workshops/get/');

      this.content = response;
      this.hasContent = true;

      this.content['oneDayfacGuide'] = this.content['oneDayfacGuideEn'] || this.content['oneDayfacGuideTm'] || this.content['oneDayfacGuideHi'];
      this.content['fourDayfacGuide'] = this.content['fourDayfacGuideEn'] || this.content['fourDayfacGuideTm'] || this.content['fourDayfacGuideHi'];
      
      this.content['story1'] = this.content['story1En'] || this.content['story1Tm'] || this.content['story1Hi'];
      this.content['story2'] = this.content['story2En'] || this.content['story2Tm'] || this.content['story2Hi'];

  }

  ngAfterViewInit() {

    AOS.init({
      duration: 700,
      easing: 'ease-in-out'
    });

  }

}
