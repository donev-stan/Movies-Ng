import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseData } from 'src/app/shared/models/response-data';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trendingItems: any[] = [];
  totalResults: number = 0;

  @Output() resetPage: Subject<boolean> = new Subject();

  private _selectedMedia: string = 'all';
  private _selectedTimeWindow: string = 'day';

  get selectedMedia(): string {
    return this._selectedMedia;
  }

  set selectedMedia(media: string) {
    this._selectedMedia = media;
    this.resetPage.next(true);
    this.fetchTrendingItems();
  }

  get selectedTimeWindow(): string {
    return this._selectedTimeWindow;
  }

  set selectedTimeWindow(timeWindow: string) {
    this._selectedTimeWindow = timeWindow;
    this.resetPage.next(true);
    this.fetchTrendingItems();
  }

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.fetchTrendingItems();
  }

  fetchTrendingItems(page?: number): void {
    this.db
      .getTrending(this.selectedMedia, this.selectedTimeWindow, page)
      .subscribe({
        next: (data: ResponseData) => {
          this.trendingItems = data.results;
          // this.totalResults = data.total_results;
        },
      });
  }
}
