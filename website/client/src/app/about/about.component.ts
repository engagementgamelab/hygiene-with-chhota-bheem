import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as AOS from 'aos';
import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public content: any;
  public isPhone: boolean;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService) {
    this.isPhone = ismobile.phone;
  }

  ngOnInit() {

    this._dataSvc.getDataForUrl('about/get/').subscribe(response => {

      this.content = response;
      this.hasContent = true;

    });

  }

  ngAfterViewInit() {

    AOS.init({
      duration: 700,
      easing: 'ease-in-out'
    });

  }
}
