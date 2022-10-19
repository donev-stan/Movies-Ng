import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  genres: any[] = [];
  filtersForm: FormGroup;
  items: any[] = [];
  totalPages: number = 0;
  totalResults: number = 0;

  constructor(private db: MovieDBService) {
    this.filtersForm = new FormGroup({
      selectedMedia: new FormControl('movie'),
      selectedSort: new FormControl('popularity.desc'),
      selectedGenres: new FormControl([]),
    });

    this.filtersForm.valueChanges.subscribe((filterValues: any) => {
      console.log(filterValues);
      this.fetchResults(filterValues);
    });

    this.filtersForm
      .get('selectedMedia')
      ?.valueChanges.subscribe((value: string) => {
        this.fetchGenres(value);
      });
  }

  ngOnInit(): void {
    this.fetchResults(this.filtersForm.value);
    this.fetchGenres('');
  }

  fetchResults(filterValues: FormGroup): void {
    this.db.discover(filterValues).subscribe({
      next: (response) => {
        console.log(response);
        this.items = response.results;
        this.totalPages = response.total_pages;
        this.totalResults = response.total_results;
      },
    });
  }

  fetchGenres(media: string): void {
    this.db.getGenres(media).subscribe({
      next: (genres) => {
        console.log(genres);

        this.genres = genres;
      },
    });
  }
}
