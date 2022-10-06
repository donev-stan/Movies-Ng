import { Component, Input, OnInit } from '@angular/core';
import { IGenresList } from 'src/app/shared/models/genres-list';
import { MovieDBService } from 'src/app/shared/movie-db.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  genres: IGenresList[] = [];
  filteredGenres: IGenresList[] = [];
  private _filterKeyword: string = '';

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.db.getMovieGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
        this.filterKeyword = '';
      },
    });
  }

  get filterKeyword(): string {
    return this._filterKeyword;
  }

  set filterKeyword(value: string) {
    this._filterKeyword = value;
    this.filteredGenres = this.filterGeneres(value);
  }

  filterGeneres(keyword: string): IGenresList[] {
    return this.genres.filter((genre: IGenresList) =>
      genre.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
