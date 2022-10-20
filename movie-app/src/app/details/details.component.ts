import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private db: MovieDBService) {
    route.params.subscribe((params: Params) => {
      const media_type = params['type'];
      const media_id = params['id'];

      db.getSingle(media_type, media_id).subscribe({
        next: (data) => {
          console.log(data);
        },
      });
    });
  }

  ngOnInit(): void {}
}
