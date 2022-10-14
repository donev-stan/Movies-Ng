import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ResponseData } from 'src/app/shared/models/response-data';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  item: any;
  animate: boolean = false;
  isDataReady: boolean = false;

  favorite: boolean = false;
  bookmarked: boolean = false;
  rated: boolean = false;

  media_type: string = 'movie';

  constructor(private db: MovieDBService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.isDataReady = false;
      this.animate = false;
      this.item = {};

      if (Object.keys(params).length) {
        const id = params['id'];
        const media_type = params['type'];
        this.media_type = media_type;

        this.db.getSingle(media_type, id).subscribe({
          next: (data) => {
            this.item = data;
            this.checkFavorite();
            this.checkWatchlist();

            setTimeout(() => {
              this.isDataReady = true;
              this.animate = true;
            }, 300);
          },
        });
      } else {
        this.db.getTopRated().subscribe({
          next: (data: any) => {
            this.item = data.results[0];
            this.checkFavorite();
            this.checkWatchlist();

            setTimeout(() => {
              this.isDataReady = true;
              this.animate = true;
            }, 300);
          },
        });
      }

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

  checkFavorite(): void {
    this.db.getFavorites().subscribe({
      next: (data) => {
        const notUndefined = data.results.find(
          (favoriteItem: any) => favoriteItem.id === this.item.id
        );

        if (notUndefined) this.favorite = true;
        else this.favorite = false;
      },
    });
  }

  markFavorite(): void {
    this.favorite = !this.favorite;

    this.db
      .postFavorite(this.media_type, this.item.id, this.favorite)
      .subscribe({
        next: (response: any) => {
          if (!response.success) this.favorite = !this.favorite;
        },
      });
  }

  checkWatchlist(): void {
    this.db.getWatchlist().subscribe({
      next: (data) => {
        const notUndefined = data.results.find(
          (favoriteItem: any) => favoriteItem.id === this.item.id
        );

        if (notUndefined) this.bookmarked = true;
        else this.bookmarked = false;
      },
    });
  }

  markWatchlist(): void {
    this.bookmarked = !this.bookmarked;

    this.db
      .postWatchlist(this.media_type, this.item.id, this.bookmarked)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          if (!response.success) this.bookmarked = !this.bookmarked;
        },
      });
  }
}
