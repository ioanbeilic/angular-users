import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from './user.interface';
import { environment } from '../../environments/environment';
import { NotificationService } from '../shared/services/notification.service';
import { ISnackBarData } from '../shared/interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;
  user = new Subject<IUser>();

  constructor(private http: HttpClient) {}

  selectedUser(user: IUser) {
    this.user.next(user);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users/`);
  }

  getUser(user: IUser): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${user.id}`);
  }

  createUser(user: IUser) {
    return this.http.post(`${this.baseUrl}/users/`, user);
  }

  updateUser(user: IUser) {
    return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  errorHandler(error: HttpErrorResponse) {
    // save to server
    return throwError(error.message || 'server error.');
  }
}
