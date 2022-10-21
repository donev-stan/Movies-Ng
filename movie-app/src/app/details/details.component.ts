import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  media_type!: string;
  media_id!: string;

  item: any = {};
  keywords: any = {};
  recommendations: any = {};
  reviews: any = {};
  reviewIndex: number = 1;

  constructor(private route: ActivatedRoute, private db: MovieDBService) {
    route.params.subscribe((params: Params) => {
      const media_type = params['type'];
      const media_id = params['id'];

      this.media_type = media_type;
      this.media_id = media_id;

      // console.log(media_type, media_id);

      this.fetchItemData();
      this.fetchKeywordsData();
      this.fetchRecommendationsData();
      this.fetchReviews();

      // db.getImages(media_type, media_id).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //   },
      // });

      this.db.getSimilar(this.media_type, this.media_id).subscribe({
        next: (response) => {
          // console.log(response);
        },
      });
    });
  }

  ngOnInit(): void {}

  fetchItemData(): void {
    this.db.getSingle(this.media_type, this.media_id).subscribe({
      next: (data) => {
        // console.log(data);
        this.item = data;
      },
    });
  }

  fetchKeywordsData(): void {
    this.db.getKeywords(this.media_type, this.media_id).subscribe({
      next: (response) => {
        // console.log(response);
        this.keywords = response;
      },
    });
  }

  fetchRecommendationsData(page?: number): void {
    this.db.getRecommendations(this.media_type, this.media_id, page).subscribe({
      next: (response) => {
        console.log(response);
        this.recommendations = response;
      },
    });
  }

  fetchReviews(): void {
    this.db.getReviews(this.media_type, this.media_id).subscribe({
      next: (response) => {
        // console.log(response);
        this.reviews = response;
      },
    });
  }

  dataReady(data: any) {
    return Object.values(data).length;
  }

  setReviewId(index: number) {
    console.log(index);
    this.reviewIndex = index;
  }
}
