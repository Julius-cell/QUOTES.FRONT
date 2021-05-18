import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { tap, map, catchError } from 'rxjs/operators';

import { Quote } from "../model/quote";
import { Response } from "../model/response";

import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class QuoteService {

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient,
                private cookieService: CookieService) {}


    getAllQuotes(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.cookieService.get('jwt')}`
        });
        return this.http.get<any>(`${this.baseUrl}/api/quotes`, {headers})
            .pipe(
                catchError(err => of(err.error))
            );
    }

    getRandomQuote(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.cookieService.get('jwt')}`
        });
        return this.http.get<any>(`${this.baseUrl}/api/quotes/random`, {headers})
            .pipe(
                catchError(err => of(err.error))
            );
    }

    postQuote(quote: Quote): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.cookieService.get('jwt')}`
        });
        return this.http.post<any>(`${this.baseUrl}/api/quotes`, quote, {headers});
    }
    
    getQuoteByAuthor(author: string): Observable<Quote> {
        return this.http.get<Quote>(`${this.baseUrl}/api/quotes/author/${author}`);
    }

    deleteQuoteById(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.cookieService.get('jwt')}`
        });
        return this.http.delete<any>(`${this.baseUrl}/api/quotes/${id}`, {headers});
    }

    modifyQuoteById(id: number, params: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.cookieService.get('jwt')}`
        });
        return this.http.patch<any>(`${this.baseUrl}/api/quotes/modify/${id}`, params, {headers});
    }

    getQuotesByCategory(categoryId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/api/categories/quotes/${categoryId}`);
    }

}