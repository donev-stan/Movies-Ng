import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @ViewChild('paginator') paginator: any;

  @Input() title: string = '';
  @Input() description: string = '';

  @Input() total_results: number = 0;
  @Input() hideFiltersBtn: boolean = false;

  @Input() resetPage: Subject<boolean> = new Subject();
  @Output() fetchNewPage: Subject<number> = new Subject();

  @Input() paginatorData: any = {
    length: 0,
    pageSize: 0,
  };

  @Input() height: string = 'auto';

  // To nbe removed
  @Input() items: any[] = [];
  @Input() media_type: string = '';
  @Input() @Output() route: string = '';

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
