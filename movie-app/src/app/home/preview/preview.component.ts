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

  animate: boolean = false;

  constructor(private db: MovieDBService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      const media_type = params['type'];

      this.animate = false;

      this.db.getSingle(media_type, id).subscribe({
        next: (data) => {
          this.singleData = data;
          this.animate = true;
        },
      });

      if (window.scrollY) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  getPersentage(vote: number): number {
    return Math.round((vote / 10) * 100);
  }
}
