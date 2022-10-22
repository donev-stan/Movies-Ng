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
  ngOnInit(): void {}

  defineRoute(): any {
    if (this.media_type === 'person') return [];
    if (this.item.nothing_found === true) return [];

    return [
      this.route,
      this.media_type !== 'all' ? this.media_type : this.item.media_type,
      this.item.id,
    ];
  }
}
