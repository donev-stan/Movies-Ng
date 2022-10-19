import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
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
  totalResults: number = 0;
  @Output() resetPage: Subject<boolean> = new Subject();

  constructor(private db: MovieDBService) {
    this.filtersForm = new FormGroup({
      selectedMedia: new FormControl('movie'),
      selectedSort: new FormControl('popularity.desc'),
      selectedGenres: new FormControl([]),
    });

    this.filtersForm.valueChanges.subscribe((filterValues: any) => {
      this.resetPage.next(true);
      this.fetchResults();
    });

    this.filtersForm
      .get('selectedMedia')
      ?.valueChanges.subscribe((value: string) => {
        this.fetchGenres(value);
      });
  }

  ngOnInit(): void {
    this.fetchResults();
    this.fetchGenres('movie');
  }

  fetchResults(page?: number): void {
    this.db.discover(this.filtersForm.value, page).subscribe({
      next: (response) => {
        this.items = response.results;
        this.totalResults = response.total_results;
      },
    });
  }

  fetchGenres(media: string): void {
    this.db.getGenres(media).subscribe({
      next: (genres) => {
        this.genres = genres;
      },
    });
  }
}
