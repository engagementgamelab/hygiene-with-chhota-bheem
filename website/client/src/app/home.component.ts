import { Component, OnInit } from '@angular/core';
import { DataService } from './utils/data.service';
import { TweenLite, TimelineLite } from 'gsap';

import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import * as AOS from 'aos';
import * as _ from 'underscore';
import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public modules: any[];
  public isPhone: boolean;

  private tls: TimelineLite[];
  t: TweenLite;

  constructor(private _dataSvc: DataService, private _scrollToSvc: ScrollToService) {
    // this.isPhone = ismobile.phone;
  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('homepage/get/').subscribe(response => {

      this.modules = response;

    });

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
