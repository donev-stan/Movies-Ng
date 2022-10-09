import { Component, OnInit } from '@angular/core';
import { MovieDBService } from '../shared/movie-db.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  searchResults: any[] = [];

  query: string = '';

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.query.trim()) {
      this.db.multiSearch(this.query).subscribe({
        next: (results) => (this.searchResults = results),
      });
    }
  }
}
