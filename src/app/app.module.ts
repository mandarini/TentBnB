import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScriptLoadService } from './script-load.service';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
AppRoutingModule
  ],
  providers: [ScriptLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
