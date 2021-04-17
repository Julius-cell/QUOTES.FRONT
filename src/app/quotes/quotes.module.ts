import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { QuoteBoxComponent } from './components/quote-box/quote-box.component';
import { SearchComponent } from './components/search/search.component';
import { NewButtonComponent } from './components/new-button/new-button.component';
import { PrimengModule } from '../primeng/primeng.module';
import { QuotesRoutingModule } from './quotes-routing.module';


@NgModule({
  declarations: [
    HomeComponent, 
    ButtonComponent, 
    QuoteBoxComponent, 
    SearchComponent, 
    NewButtonComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }
