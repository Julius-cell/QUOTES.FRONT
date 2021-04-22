import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Quote } from '../../model/quote';
import { QuoteService } from '../../services/quotes.service';


@Component({
  selector: 'app-quote-box',
  templateUrl: './quote-box.component.html',
  styleUrls: ['./quote-box.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class QuoteBoxComponent implements OnInit {

  @Input() quote: Quote;

  constructor(private cs: ConfirmationService,
              private quoteService: QuoteService,
              private ms: MessageService) { }

  ngOnInit(): void {}

  deleteQuote(id: number) {
    this.cs.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.quoteService.deleteQuoteById(id).subscribe(resp => {
          // Refresh Quotes eliminating this one
          this.ms.add(
            {
              severity: 'success',
              summary: 'Success', 
              detail:'Quote Eliminated'
            });
        })
      }
  });
  }



}
