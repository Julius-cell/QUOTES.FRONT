import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserRegister } from 'src/app/auth/models/user';

import { environment } from "src/environments/environment.prod";
import { RespUser } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<RespUser> {
    return this.http.post<RespUser>(`${this.baseUrl}/api/user/login`, user);
  }

  register(user: UserRegister): Observable<RespUser> {
    return this.http.post<RespUser>(`${this.baseUrl}/api/user/signup`, user);
  }
}
