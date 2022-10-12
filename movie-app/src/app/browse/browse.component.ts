import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  private _query: string = '';
  searchResults: any[] = [];
  totalPages: number = 0;
  totalResults: number = 0;

  @ViewChild('paginator') paginator: any;

  constructor(private db: MovieDBService) {}

  get query(): string {
    return this._query;
  }

  set query(query: string) {
    this._query = query;
    this.paginator.pageIndex = 0;
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.fetchNewPageData();
  }

  fetchNewPageData(event?: PageEvent): void {
    this.searchResults = [];
    const page = event ? event.pageIndex + 1 : 1;

    if (this.query.trim()) {
      this.db.multiSearch(this.query, page).subscribe({
        next: (response) => {
          this.searchResults = response.results;
          // response.results.length = 18;
          this.totalPages = response.total_pages;
          this.totalResults = response.total_results;
        },
      });
    }

    // if (window.scrollY) {
    //   window.scroll({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth',
    //   });
    // }
  }
}
