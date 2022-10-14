import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss'],
})
export class ProfilePanelComponent implements OnInit {
  @Input() title: string = 'Favourites';
  @Input() description: string = 'List of your favourite movies or shows.';

  constructor() {}

  ngOnInit(): void {}
}
