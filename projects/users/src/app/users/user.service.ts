import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  user = new Subject<IUser>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  selectedUser(user: IUser) {
    this.user.next(user);
  }

  getUsers() {
    return this.http
      .get<IUser>(`${this.baseUrl}/users/`)
      .pipe(catchError(this.errorHandler));
  }

  getUser() {
    return this.http
      .get(`${this.baseUrl}/users/`)
      .pipe(catchError(this.errorHandler));
  }

  createUser(user: IUser) {
    return this.http
      .post(`${this.baseUrl}/users/`, user)
      .pipe(catchError(this.errorHandler));
  }

  updateUser(user: IUser) {
    return this.http
      .put(`${this.baseUrl}/users/${user.id}`, user)
      .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number) {
    return this.http
      .delete(`${this.baseUrl}/users/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    // add server endpoint to log errors
    /**
     * must be tested if works
     *  return this.http.post(`${this.baseUrl}/error/`, error).subscribe(res => throwError(error.message || 'server error.'
     */
    this.snackBar.open(
      'An error has occurred in the request, please try again later',
      '',
      {
        duration: 2000,
        panelClass: ['mat-toolbar', 'toast-danger'],
        verticalPosition: 'top',
      }
    );
    return throwError(error.message || 'server error.');
  }
}
