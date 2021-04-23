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
  add: boolean;
  edit: boolean;
  idToEdit: number;

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

  ngOnInit(): void { }


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

  openModal() {
    this.display = true;
  }

  /**
   * Función que recibe data de la nueva quote añadida
   * @param event type Emit
   */
  openAdd() {
    this.add = true;
    this.title = 'Add Quote';
    this.display = true;
  }

  openModify(event: Emit) {
    this.edit = true;
    this.title = 'Edit Quote';
    this.idToEdit = event.data._id;
    this.modifyCmp.myForm.controls.person.setValue(event.data.person);
    this.modifyCmp.myForm.controls.quote.setValue(event.data.quote);
    this.display = true;
  }

  hideModify() {
    this.modifyCmp.myForm.reset();
    this.add = false;
    this.edit = false;
  }

  save() {
    let form = this.modifyCmp.myForm.value;
    if (this.add) {
      this.quoteService.postQuote(form).subscribe(resp => {
        // Refresh quotes with new added
        this.searchAll();
      })
    }
    if (this.edit) {
      this.quoteService
        .modifyQuoteById(this.idToEdit, form)
        .subscribe(resp => {
        // Refresh quotes with new modified
        this.searchAll();
      })
    }
    this.ms.add(
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Quote Saved'
      });
    this.modifyCmp.myForm.reset();
    this.display = false;
  }
  
}
