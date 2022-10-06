import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieDBService } from 'src/app/shared/movie-db.service';

@Component({
  selector: 'app-popular-actors',
  templateUrl: './popular-actors.component.html',
  styleUrls: ['./popular-actors.component.scss'],
})
export class PopularActorsComponent implements OnInit {
  actors: any[] = [];

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.fetchActors();
  }

  fetchActors(event?: PageEvent) {
    const page = event ? event.pageIndex + 1 : 1;

    this.db.getPopularActors(page).subscribe({
      next: (actors) => (this.actors = actors),
    });
  }
}
