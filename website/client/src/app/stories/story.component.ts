import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as AOS from 'aos';
import isMobile from 'ismobilejs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  
  public content: any;
  public prev: any;
  public next: any;

  public hasContent: boolean;
  public isPhone: boolean;
  
  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {
    
    this.isPhone = isMobile(window.navigator.userAgent).phone;
    
  }
  
  ngOnInit() {

    this._route.params.subscribe(async params => {

      // Force content reset
      this.content = undefined;
      this.next = undefined;
      this.prev = undefined;
      this.hasContent = false;
      
    const response = await this._dataSvc.getDataForUrl('stories/get/', `id=${params['key']}`);
        this.content = response['person'];
        this.next = response['next'];
        this.prev = response['prev'];
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
