import { DOCUMENT } from '@angular/common';
import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'users';
  redirect: boolean = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    const token: string = localStorage.getItem('access_token');

    if (!token) {
      if (isDevMode()) {
        //        this.document.location.href = `http://localhost:8080/`;
      } else {
        this.document.location.href = `https://${window.location.hostname}`;
      }
    } else {
      this.redirect = true;
    }
  }
}
