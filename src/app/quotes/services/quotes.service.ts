import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { catchError } from 'rxjs/operators';

import { Quote } from "../model/quote";

import { environment } from "src/environments/environment";


@Injectable()
export class QuoteService {

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}


    getAllQuotes(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/api/quotes`)
            .pipe(
                catchError(err => of(err.error))
            );
    }

    getRandomQuote(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/api/quotes/random`)
            .pipe(
                catchError(err => of(err.error))
            );
    }

    postQuote(quote: Quote): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/quotes`, quote);
    }
    
    getQuoteByAuthor(author: string): Observable<Quote> {
        return this.http.get<Quote>(`${this.baseUrl}/api/quotes/author/${author}`);
    }

    deleteQuoteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/api/quotes/${id}`);
    }

    modifyQuoteById(id: number, params: any): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/api/quotes/modify/${id}`, params);
    }

    getQuotesByCategory(categoryId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/api/categories/quotes/${categoryId}`);
    }

}