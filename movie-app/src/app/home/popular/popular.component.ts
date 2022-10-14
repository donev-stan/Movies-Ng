import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseData } from 'src/app/shared/models/response-data';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  popularItems: any[] = [];
  totalResults: number = 0;

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
    this.db.getPopular(this._selectedMedia, page).subscribe({
      next: (data: ResponseData) => {
        this.popularItems = data.results;
        // this.totalResults = data.total_results;
      },
    });
  }
}
