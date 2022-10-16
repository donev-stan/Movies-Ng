import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  searchResults: any[] = [];
  totalPages: number = 0;
  totalResults: number = 0;

  query: string = '';
  selectedMedia: string = 'multi';

  @ViewChild('paginator') paginator: any;

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.db.getPopular().subscribe({
      next: (response) => {
        console.log(response);
        this.searchResults = response.results;
        // this.totalPages = response.total_pages;
        // this.totalResults = response.total_results;
      },
    });
  }

  fetchNewPageData(event?: PageEvent): void {
    this.searchResults = [];
    const page = event ? event.pageIndex + 1 : 1;

    this.db.search(this.query, this.selectedMedia, page).subscribe({
      next: (response: any) => {
        this.searchResults = response.results;
        this.totalPages = response.total_pages;
        this.totalResults = response.total_results;
      },
    });
  }
}
