import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDBService } from 'src/app/shared/movie-db.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  singleData: any;

  constructor(private db: MovieDBService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      const media_type = params['type'];

      console.log(params);

      this.db.getSingle(media_type, id).subscribe({
        next: (data) => (this.singleData = data),
      });
    });
  }

  getPersentage(vote: number): number {
    return Math.round((vote / 10) * 100);
  }
}
