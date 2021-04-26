import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { RespCategory } from "../model/response";

// import { environment } from "src/environments/environment";
import { environment } from "src/environments/environment.prod";



@Injectable()
export class CategoryService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<RespCategory> {
    return this.http.get<RespCategory>(`${this.baseUrl}/api/categories`);
  }

  postCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/categories`, category);
  }

  deleteCategoryById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/categories/${id}`);
  }

}