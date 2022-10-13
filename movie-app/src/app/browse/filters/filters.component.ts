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
  @ViewChild('genresList') genresList: any;
  genres: any[] = [];
  filtersForm: FormGroup;

  constructor(private db: MovieDBService) {
    this.filtersForm = new FormGroup({
      query: new FormControl(''),
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

  onSearch(): void {
    // Extract Selected Genres
    (<FormArray>this.filtersForm.controls['selectedGenres']).setValue(
      this.genresList.selectedOptions.selected.map(
        (option: any) => option.value
      )
    );

    console.log(this.filtersForm.value);

    this.search.next(this.filtersForm.value);
  }

  updateSelectedGenres(event: any): void {
    // console.log(event.options[0].selectionList['value']);
  }
}
