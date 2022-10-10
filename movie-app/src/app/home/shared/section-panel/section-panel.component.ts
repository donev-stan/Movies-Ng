import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-panel',
  templateUrl: './section-panel.component.html',
  styleUrls: ['./section-panel.component.scss'],
})
export class SectionPanelComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() items: any[] = [];
  @Input() isExpanded: boolean = true;
  @Output() fetchNewPage: Subject<number> = new Subject();
  @ViewChild('paginator') paginator: any;
  @Input() resetPage: Subject<boolean> = new Subject();
  @Input() media_type: string = '';

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
