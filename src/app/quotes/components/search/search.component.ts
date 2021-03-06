import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Quote } from '../../model/quote';
import { QuoteService } from '../../services/quotes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  quotes: Quote[];
  placeholder: string = 'Search by Author'
  inputAuthor: Quote[];
  @Output() onInputAuthor: EventEmitter<Quote[]> = new EventEmitter();
  @ViewChild('searchCmp') searchCmp: ElementRef<HTMLInputElement>;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getAllQuotes().subscribe(resp => {
      this.quotes = resp.data;
    })
  }


  sendNewValue(event: any) {   
    if (event) {
      this.inputAuthor  = this.quotes.filter(quote => quote.person.toLowerCase().includes(event));      
    } else {
      this.inputAuthor  = [];
    }
    this.onInputAuthor.emit(this.inputAuthor);
  }
}
