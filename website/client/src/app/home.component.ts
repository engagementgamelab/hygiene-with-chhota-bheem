import { Component, OnInit } from '@angular/core';
import { DataService } from './utils/data.service';

import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import * as AOS from 'aos';
import * as _ from 'underscore';

import isMobile from 'ismobilejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public modules: any[];
  public files: any;
  public isPhone: boolean;
  public currentLang: string;
  
  constructor(private _dataSvc: DataService, private _scrollToSvc: ScrollToService) {
    this.isPhone = isMobile(window.navigator.userAgent).phone;
  }

  async ngOnInit() {

    this.currentLang = this._dataSvc.currentLang.value;
    this._dataSvc.currentLang.subscribe((val) => {
      this.currentLang = val;
    });

    const response = await this._dataSvc.getDataForUrl('homepage/get/');

      this.modules = response['content'];
      this.files = response['files'];

  }

  ngAfterViewInit() {

    AOS.init({
      duration: 700,
      easing: 'ease-in-out'
    });

  }

  goToModule(moduleNum: number) {

    this._scrollToSvc
      .scrollTo({
        target: document.getElementById('module' + moduleNum),
        offset: 200,
        easing: 'easeOutQuint',
        duration: 700
      });

  }

}
