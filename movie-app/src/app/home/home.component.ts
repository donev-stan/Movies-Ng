import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IGenresList } from '../shared/models/genres-list';
import { MovieDBService } from '../shared/movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private db: MovieDBService) {}

  ngOnInit(): void {}
}
