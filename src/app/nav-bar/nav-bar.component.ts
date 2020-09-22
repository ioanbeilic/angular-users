import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  subsrcriber: Subscription;

  constructor(location: Location, router: Router) {
    this.subsrcriber = router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
      } else {
        this.route = 'Users';
      }

      console.log(this.route);
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.subsrcriber.unsubscribe();
  }
}
