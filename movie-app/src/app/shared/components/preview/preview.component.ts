import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RateItemDialogComponent } from 'src/app/rate-item-dialog/rate-item-dialog.component';
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

  loggedIn: boolean = false;

  ratingValue: number = 0;

  constructor(
    private db: MovieDBService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.db.checkLoggedIn();

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

            if (this.loggedIn) {
              this.checkFavorite();
              this.checkWatchlist();
              this.checkRating();
            }

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

            if (this.loggedIn) {
              this.checkFavorite();
              this.checkWatchlist();
              this.checkRating();
            }

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

  // Favorite
  checkFavorite(): void {
    this.db
      .getFavorites(this.media_type === 'movie' ? 'movies' : 'tv')
      .subscribe({
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
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.favorite = !this.favorite;

    this.db
      .postFavorite(this.media_type, this.item.id, this.favorite)
      .subscribe({
        next: (response: any) => {
          if (!response.success) this.favorite = !this.favorite;
        },
      });
  }

  // Watchlist
  checkWatchlist(): void {
    this.db
      .getWatchlist(this.media_type === 'movie' ? 'movies' : 'tv')
      .subscribe({
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
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
      return;
    }

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

  // Rating
  checkRating(): void {
    this.db.getRated(this.media_type === 'movie' ? 'movies' : 'tv').subscribe({
      next: (data: any) => {
        const notUndefined = data.results.find(
          (ratedItem: any) => ratedItem.id === this.item.id
        );

        if (notUndefined) {
          this.rated = true;
          this.ratingValue = notUndefined.rating;
        } else {
          this.rated = false;
        }
      },
    });
  }

  rateItem(): void {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const dialogRef = this.dialog.open(RateItemDialogComponent, {
      width: '300px',
      data: {
        title: this.item.title || this.item.name,
        ratingValue: this.ratingValue || 0,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResponse: any) => {
      if (typeof dialogResponse === 'number') {
        this.db
          .postRating(this.media_type, this.item.id, dialogResponse)
          .subscribe({
            next: (response: any) => {
              if (response.success) {
                this.rated = true;
                this.ratingValue = dialogResponse;
                this.snackBar.open('Successfully updated rating!', '', {
                  duration: 3000,
                });
              }
            },
          });
      } else if (dialogResponse === 'remove') {
        this.db.deleteRating(this.media_type, this.item.id).subscribe({
          next: (response: any) => {
            if (response.success) {
              this.rated = false;
              this.ratingValue = 0;
              this.snackBar.open('Successfully removed rating!', '', {
                duration: 3000,
              });
            }
          },
        });
      }
    });
  }
}
