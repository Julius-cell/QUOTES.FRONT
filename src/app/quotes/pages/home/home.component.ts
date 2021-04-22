import { Component, OnInit, ViewChild } from '@angular/core';

import { BtnConfig } from '../../model/btn-config';
import { Emit } from '../../model/emit';
import { Quote } from '../../model/quote';

import { ModifyComponent } from '../modify/modify.component';
import { SearchComponent } from "../../components/search/search.component";

import { QuoteService } from '../../services/quotes.service';
import { MessageService } from 'primeng/api'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    MessageService
  ]
})
export class HomeComponent implements OnInit {

  quotes: Quote[];
  display: boolean = false;
  title: string;

  @ViewChild(SearchComponent) searchCmp: SearchComponent;
  @ViewChild(ModifyComponent) modifyCmp: ModifyComponent;

  searchAllBtnConfig: BtnConfig = {
    name: 'all',
    styles: {
      margin: '0 5px'
    },
    label: 'Search All'
  }
  searchRandomBtnConfig = {
    name: 'random',
    styles: {
      margin: '0 5px'
    },
    label: 'Search Random'
  }

  constructor(private quoteService: QuoteService,
              private ms: MessageService) { }

  ngOnInit(): void {}


  searchAll() {
    this.quoteService.getAllQuotes().subscribe(resp => {
      console.log(resp.data);
      this.quotes = resp.data;
    })
    this.searchCmp.searchCmp.nativeElement.value = '';
  }
  
  searchRandom() {
    this.quoteService.getRandomQuote().subscribe(resp => {
      console.log(resp.data);
      this.quotes = resp.data;
    })
    this.searchCmp.searchCmp.nativeElement.value = '';
  }

  searchByAuthor(event: any) {
    this.quotes = event;
  }

  openAdd() {
    this.title = 'Add Quote';
    this.display = true;
  }
  
  hideModify() {
    this.modifyCmp.myForm.reset();
  }

  saveModify(event: Emit) {
    this.quoteService.postQuote(event.data).subscribe(resp => {
      console.log(resp);
      this.ms.add(
        {
          severity: resp.status,
          summary: resp.status, 
          detail:'Quote Saved'
        });
        // Refresh quotes with new added
    })
    this.modifyCmp.myForm.reset();
    this.display = event.change;
  }
}
