import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = localStorage.getItem('access_token');
  private readonly REFRESH_TOKEN = localStorage.getItem('refresh_token');
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.baseUrl}/login`, user).pipe(
      tap((tokens) => this.doLoginUser(user.username, tokens)),
      mapTo(true),
      catchError((error) => {
        alert(error.error);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http
      .post<any>(`${environment.baseUrl}/logout`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError((error) => {
          alert(error.error);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken(): Observable<string | object> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.REFRESH_TOKEN);

    console.log(headers);

    return this.http
      .post<any>(
        `${environment.baseUrl}/refresh`,
        {
          refresh_token: this.REFRESH_TOKEN,
        },
        {
          headers,
        }
      )
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.access_token);
        })
      );
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
