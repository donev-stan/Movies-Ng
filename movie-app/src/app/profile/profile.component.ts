import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  selectedTabIndex: number = 2;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(router);
    console.log(router.url);
    console.log(route);
  }

  ngOnInit(): void {}
}
