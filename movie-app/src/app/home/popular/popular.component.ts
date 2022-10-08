import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieDBService } from 'src/app/shared/movie-db.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  @Input() popularItems: any[] = [];
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
      next: (items) => (this.popularItems = items),
    });
  }
}
