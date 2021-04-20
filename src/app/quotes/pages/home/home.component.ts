import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Quote } from '../../model/quote';
import { Response } from '../../model/response';
import { QuoteService } from '../../services/quotes.service';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  quotes: Quote[];

  @ViewChild(SearchComponent) searchCmp: SearchComponent;
  // @ViewChild('searchCmp') searchCmp: any;
  // @ViewChildren('searchCmp') searchCmp: ElementRef;

  searchAllBtnConfig = {
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

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    console.log(this.searchCmp.placeholder) // I am a child component!
  }
  
  searchAll() {
    this.quoteService.getAllQuotes().subscribe(resp => {
      console.log(resp.data);
      this.quotes = resp.data;
    })
    // Reset input search
    this.searchCmp.placeholder = 'Search by Author';
  }
  
  searchRandom() {
    this.quoteService.getRandomQuote().subscribe(resp => {
      console.log(resp.data);
      this.quotes = resp.data;
    })
    // Reset input search
  }

  searchByAuthor(event: any) {
    this.quotes = event;
  }



}
