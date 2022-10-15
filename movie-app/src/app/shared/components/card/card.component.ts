import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() item: any = {};
  @Input() media_type: string = '';
  @Input() route: string = '';

  constructor() {}
  ngOnInit(): void {
    console.log(this.media_type);
  }
}
