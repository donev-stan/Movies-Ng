import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MovieDBService } from 'src/app/shared/movie-db.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss'],
})
export class PopularMoviesComponent implements OnInit {
  movies: any[] = [];
  isShows: boolean = false;

  @ViewChild('paginator') paginator: any;

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(page?: number): void {
    this.db.getPopularMovies(page).subscribe({
      next: (movies) => (this.movies = movies),
    });
  }

  fetchShows(page?: number): void {
    this.db.getPopularShows(page).subscribe({
      next: (movies) => (this.movies = movies),
    });
  }

  fetchNewPageData(event?: PageEvent): void {
    const page = event ? event.pageIndex + 1 : 1;

    if (this.isShows) this.fetchShows(page);
    else this.fetchMovies(page);
  }

  onChange(event: MatSlideToggleChange): void {
    this.movies = [];
    this.isShows = event.checked;
    this.paginator.pageIndex = 0;
    this.fetchNewPageData();
  }
}
