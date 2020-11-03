import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { IUser } from '../shared/interfaces/user.interface';
import { environment } from '../../environments/environment';

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
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }

  getUser(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${userId}`);
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

  resetPassword(userId: number, password: string = '') {
    if (!password) {
      password = Math.random() // Generate random number, eg: 0.123456
        .toString(36) // Convert  to base-36 : "0.4fzyo82mvyr"
        .slice(-8); // Cut off last 8 characters : "yo82mvyr"
    }
    return this.http.patch(`${this.baseUrl}/users/reset-password`, password);
  }

  getDepartments() {
    return this.http.get(`${this.baseUrl}/users/departments`);
  }

  createDepartments(department: string) {
    return this.http.post(`${this.baseUrl}/users/departments`, department);
  }

  deleteDepartments(departmentId: number) {
    return this.http.delete(
      `${this.baseUrl}/users/departments/${departmentId}`
    );
  }

  userTypes() {
    return this.http.get(`${this.baseUrl}/users/user-types`);
  }

  privileges() {
    return this.http.get(`${this.baseUrl}/users/privileges`);
  }
}
