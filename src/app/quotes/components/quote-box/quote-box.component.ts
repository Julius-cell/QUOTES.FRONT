import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emit } from '../../model/emit';
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
  @Output() onModifyQuoteData: EventEmitter<Emit> = new EventEmitter();

  constructor(private cs: ConfirmationService,
    private quoteService: QuoteService,
    private ms: MessageService) { }

  ngOnInit(): void { }


  /**
   * Función que elimina un registro envíando el parámetro id
   * en la llamada al servicio.
   * @param id 
   */
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
              detail: 'Quote Eliminated'
            });
        })
      }
    });
  }

  /**
   * Función que envía la data para editar una quote.
   * @emits onModifyQuoteData {name: 'add', data: quote}
   */
  openEditModal(quote: Quote) {
    this.onModifyQuoteData.emit({name: 'edit', data: quote});
  }



}
