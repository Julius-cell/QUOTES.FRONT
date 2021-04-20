import { Component, Input, OnInit } from '@angular/core';
import { Quote } from '../../model/quote';

@Component({
  selector: 'app-quote-box',
  templateUrl: './quote-box.component.html',
  styleUrls: ['./quote-box.component.css']
})
export class QuoteBoxComponent implements OnInit {

  @Input() quote: Quote;

  constructor() { }

  ngOnInit(): void {
    
  }

}
