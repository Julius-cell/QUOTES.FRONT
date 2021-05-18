import { Component, OnInit, ViewChild } from '@angular/core';

import { BtnConfig } from '../../model/btn-config';
import { Emit } from '../../model/emit';
import { Quote } from '../../model/quote';

import { ModifyComponent } from '../../components/modify/modify.component';
import { SearchComponent } from "../../components/search/search.component";

import { QuoteService } from '../../services/quotes.service';
import { MessageService } from 'primeng/api'
import { Category } from '../../model/category';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';


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

  get user() {
    return this.authService.user;
  }

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
              private ms: MessageService,
              private router: Router,
              private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit(): void { 
    console.log(this.user);
    
  }

  logout() {
    this.cookieService.delete('jwt');
    this.router.navigateByUrl('/auth');
  }


  searchAll() {
    this.quoteService.getAllQuotes().subscribe((resp: any) => {
      if (resp.status === 'success') {
        console.log(resp);
        this.quotes = resp.data;
      } else {
        this.ms.add({severity:'error', summary: `${resp.status}`, detail: `${resp.error}`});
      }
    })
    this.searchCmp.searchCmp.nativeElement.value = '';
  }

  searchRandom() {
    this.quoteService.getRandomQuote().subscribe(resp => {
      if (resp.status === 'success') {
        console.log(resp);
        this.quotes = resp.data;
      } else {
        this.ms.add({severity:'error', summary: `${resp.status}`, detail: `${resp.error}`});
      }
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
    const form = this.modifyCmp.myForm.controls;
    this.edit = true;
    this.title = 'Edit Quote';
    this.idToEdit = event.data._id;

    let catergories: any = [];
    event.data.category.map(categoryId => {
      catergories.push(this.modifyCmp.categories.filter((category: Category) => categoryId === category._id));
    });

    form.person.setValue(event.data.person);
    form.quote.setValue(event.data.quote);
    form.category.setValue(catergories.flat());
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
      this.deployToast('Quote saved');
    }
    if (this.edit) {
      this.quoteService
        .modifyQuoteById(this.idToEdit, form)
        .subscribe(resp => {
          // Refresh quotes with new modified
          this.searchAll();
        })
        this.deployToast('Quote updated');
    }
    this.modifyCmp.myForm.reset();
    this.display = false;
  }

  deployToast(detail: string) {
    this.ms.add(
      {
        severity: 'success',
        summary: 'Success',
        detail: `${detail}`
      });
  }

}
