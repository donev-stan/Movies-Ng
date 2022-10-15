import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-rated',
  templateUrl: './rated.component.html',
  styleUrls: ['./rated.component.scss'],
})
export class RatedComponent implements OnInit {
  items: any[] = [];
  total_pages: number = 0;
  total_results: number = 0;

  private _selectedMedia: string = 'movies';
  private _selectedSort: string = 'created_at.desc';

  @Output() resetPage: Subject<boolean> = new Subject();

  constructor(private db: MovieDBService) {}

  get selectedMedia(): string {
    return this._selectedMedia;
  }

  set selectedMedia(media: string) {
    this._selectedMedia = media;
    this.resetPage.next(true);
    this.fetchRated();
  }

  get selectedSort(): string {
    return this._selectedSort;
  }

  set selectedSort(sortType: string) {
    this._selectedSort = sortType;
    this.resetPage.next(true);
    this.fetchRated();
  }

  ngOnInit(): void {
    this.fetchRated();
  }

  fetchRated(page?: number): void {
    this.db.getRated(this.selectedMedia, this.selectedSort, page).subscribe({
      next: (data) => {
        console.log(data);

        this.items = data.results;
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
      },
    });
  }
}
