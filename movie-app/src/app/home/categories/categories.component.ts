import { Component, OnInit } from '@angular/core';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  genres: any[] = [];
  filteredGenres: any[] = [];
  private _filterKeyword: string = '';

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.db.getGenres().subscribe({
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

  filterGeneres(keyword: string): any[] {
    return this.genres.filter((genre: any) =>
      genre.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
