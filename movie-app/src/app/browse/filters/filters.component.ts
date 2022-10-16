import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() search: Subject<any> = new Subject();
  searchFilters: FormGroup;
  discoverFilters: FormGroup;
  mode: 'discover' | 'search' = 'search';
  genres: any[] = [];

  @ViewChild('drawer') drawer: any;

  constructor(private db: MovieDBService) {
    this.searchFilters = new FormGroup({
      query: new FormControl(''),
      selectedMedia: new FormControl('multi'),
    });

    this.discoverFilters = new FormGroup({
      selectedSort: new FormControl('popularity.desc'),
      selectedMedia: new FormControl('movie'),
      selectedGenres: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.db.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
    });
  }

  changeMode(mode: 'search' | 'discover'): void {
    this.mode = mode;
    this.drawer.toggle();
  }

  onSearch(): void {
    if (this.mode === 'discover') {
      this.search.next(this.discoverFilters.value);
    } else if (this.mode === 'search') {
      this.search.next({ ...this.searchFilters.value, mode: this.mode });
    }
  }
}
