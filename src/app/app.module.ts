import { NgModule, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesModule } from './quotes/quotes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    QuotesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

}
