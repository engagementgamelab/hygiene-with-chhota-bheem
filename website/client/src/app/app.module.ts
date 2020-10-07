import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

// Utils
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';
import { ButtonComponent } from './utils/app-button/button.component';
import { PrettyUrlPipe } from './utils/pretty-url.pipe';

// NPM
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';

import { DataService } from './utils/data.service';
import { RedirectService } from './utils/redirect.service';
import { StoryIndexComponent } from './stories/index.component';
import { StoryComponent } from './stories/story.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ResourcesComponent } from './resources/resources.component';

import { LocalizedComponent } from './utils/localized/localized.component';
import { LinebreakPipe } from './utils/linebreak.pipe';
import { ScullyLibModule } from '@scullyio/ng-lib';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

// App routes
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'stories', component: StoryIndexComponent },
  { path: 'stories/:key', component: StoryComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'resources/:lang', component: ResourcesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    
    HomeComponent,
    AboutComponent,
    CdnImageComponent,
    ButtonComponent,
    PrettyUrlPipe,
    StoryIndexComponent,
    StoryComponent,
    LocalizedComponent,
    LinebreakPipe,
    WorkshopsComponent,
    ResourcesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CloudinaryModule.forRoot(cloudinary, config),
    HttpClientModule,
    RouterModule.forRoot(routes),
    ScrollToModule.forRoot(),
    ScullyLibModule
  ],
  providers: [
    DataService,
    RedirectService,
    Title
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
