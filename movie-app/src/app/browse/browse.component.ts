import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
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

  searchFilters: any = {};

  @ViewChild('paginator') paginator: any;

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    // this.db.getTopRated().subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    // });
  }

  searchRequest(event: any): void {
    this.searchFilters = event;
    this.paginator.pageIndex = 0;

    this.fetchNewPageData();
  }

  fetchNewPageData(event?: PageEvent): void {
    this.searchResults = [];
    const page = event ? event.pageIndex + 1 : 1;

    this.db.discover(this.searchFilters, page).subscribe({
      next: (response: any) => {
        this.searchResults = response.results;
        this.totalPages = response.total_pages;
        this.totalResults = response.total_results;
      },
    });

    // this.db.multiSearch(this.query, this.selectedMedia, page).subscribe({
    //   next: (response) => {
    //     this.searchResults = response.results;
    //     this.totalPages = response.total_pages;
    //     this.totalResults = response.total_results;
    //   },
    // });
  }
}
