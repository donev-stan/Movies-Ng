import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
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
    this.fetchWatchlist();
  }

  ngOnInit(): void {
    this.fetchWatchlist();
  }

  fetchWatchlist(page?: number): void {
    this.db.getWatchlist(this._selectedMedia, page).subscribe({
      next: (data) => {
        console.log(data);

        this.items = data.results;
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
      },
    });
  }
}
