import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { User, UserLogin, UserRegister } from 'src/app/auth/models/user';

import { environment } from "src/environments/environment.prod";
import { RespUser } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<string> {
    return this.http.post<RespUser>(`${this.baseUrl}/api/user/login`, user)
      .pipe(
        tap(resp => {
          if (resp.status === 'success') {
            this._user = { name: resp.data?.name!, email: resp.data?.email! }
          }
        }),
        map(resp => resp.status),
        catchError(err => of(err.error))
      );
  }

  register(user: UserRegister): Observable<RespUser> {
    return this.http.post<RespUser>(`${this.baseUrl}/api/user/signup`, user);
  }
}
