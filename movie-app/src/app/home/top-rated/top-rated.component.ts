import { Component, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit {
  topRated: any[] = [];

  @Output() resetPage: Subject<boolean> = new Subject();

  private _selectedMedia: string = 'movie';

  get selectedMedia(): string {
    return this._selectedMedia;
  }

  set selectedMedia(media: string) {
    this._selectedMedia = media;
    this.resetPage.next(true);
    this.fetchTopRated();
  }

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.fetchTopRated();
  }

  fetchTopRated(page?: number): void {
    this.db.getTopRated(this._selectedMedia, page).subscribe({
      next: (items) => {
        this.topRated = items;
      },
    });
  }
}
