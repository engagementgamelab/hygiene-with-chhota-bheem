import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';
import * as AOS from 'aos';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  public content: any;
  public isPhone: boolean;
  public hasContent: boolean;

  public languages: any[] = new Array();

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
 
  this._dataSvc.getDataForUrl('resources/get/').subscribe(response => {
    
    this.languages[0] = {};
    this.languages[1] = {};
    this.languages[2] = {};

    let en = _.pick(response, (v, k) => k.indexOf('En') > 0);
    let tm = _.pick(response, (v, k) => k.indexOf('Tm') > 0);
    let hi = _.pick(response, (v, k) => k.indexOf('Hi') > 0);

    _.each(en, (v, k) => { this.languages[0][k.replace('En', '')] = v; })
    _.each(tm, (v, k) => { this.languages[1][k.replace('Tm', '')] = v; })
    _.each(hi, (v, k) => { this.languages[2][k.replace('Hi', '')] = v; })
    
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
