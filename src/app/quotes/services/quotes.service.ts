import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Quote } from "../model/quote";

import { environment } from "src/environments/environment";
import { Response } from "../model/response";



@Injectable()
export class QuoteService {

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}


    getAllQuotes(): Observable<Response> {
        return this.http.get<Response>(`${this.baseUrl}/api/quotes`);
    }

    getRandomQuote(): Observable<Response> {
        return this.http.get<Response>(`${this.baseUrl}/api/quotes/random`);
    }

    postQuote(quote: Quote): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}/api/quotes`, quote);
    }
    
    getQuoteByAuthor(author: string): Observable<Quote> {
        return this.http.get<Quote>(`${this.baseUrl}/api/quotes/author/${author}`);
    }

    deleteQuoteById(id: number): Observable<Quote> {
        return this.http.delete<Quote>(`${this.baseUrl}/api/quotes/${id}`);
    }

    modifyQuoteById(id: number, params: any): Observable<Quote> {
        return this.http.patch<Quote>(`${this.baseUrl}/api/quotes/modify/${id}`, params);
    }

}