import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  items: any[] = [];
  total_pages: number = 0;
  total_results: number = 0;

  private _selectedMedia: string = 'movies';

  @Output() resetPage: Subject<boolean> = new Subject();

  constructor(private db: MovieDBService) {}

  get selectedMedia(): string {
    return this._selectedMedia;
  }

  set selectedMedia(media: string) {
    this._selectedMedia = media;
    this.resetPage.next(true);
    this.fetchFavorites();
  }

  ngOnInit(): void {
    this.fetchFavorites();
  }

  fetchFavorites(page?: number): void {
    this.db.getFavorites(this.selectedMedia, page).subscribe({
      next: (data) => {
        this.items = data.results;
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
      },
    });
  }
}
