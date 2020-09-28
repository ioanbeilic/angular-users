import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  route: string;

  // create a subscribe to be unloaded on destroy
  subscriber: Subscription;

  constructor(location: Location, router: Router) {
    this.subscriber = router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
      } else {
        this.route = 'Users';
      }
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
