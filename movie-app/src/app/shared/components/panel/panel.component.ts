import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() items: any[] = [];
  // @Input() total_pages: number = 1;
  @Input() total_results: number = 0;

  @Input() resetPage: Subject<boolean> = new Subject();
  @Input() media_type: string = '';

  @Output() fetchNewPage: Subject<number> = new Subject();
  @ViewChild('paginator') paginator: any;

  constructor() {}

  ngOnInit(): void {
    this.resetPage.subscribe({
      next: () => (this.paginator.pageIndex = 0),
    });
  }

  fetchNewPageData(event: PageEvent): void {
    this.items = [];
    const page = event ? event.pageIndex + 1 : 1;
    this.fetchNewPage.next(page);
  }
}
