import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  similar: any = {};
  videos: any = {};
  videoIndex: number = 1;

  providers: any[] = [];

  constructor(private route: ActivatedRoute, private db: MovieDBService) {
    route.params.subscribe((params: Params) => {
      const media_type = params['type'];
      const media_id = params['id'];

      this.media_type = media_type;
      this.media_id = media_id;

      // console.log(media_type, media_id);

      this.fetchItemData();
      this.fetchKeywords();
      this.fetchRecommendations();
      this.fetchReviews();
      this.fetchSimilar();
      this.fetchVideos();
      this.fetchProviders();

      // db.getImages(media_type, media_id).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //   },
      // });
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

  fetchKeywords(): void {
    this.db.getKeywords(this.media_type, this.media_id).subscribe({
      next: (response) => {
        // console.log(response);
        this.keywords = response;
      },
    });
  }

  fetchRecommendations(page?: number): void {
    this.db.getRecommendations(this.media_type, this.media_id, page).subscribe({
      next: (response) => {
        // console.log(response);
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

  fetchSimilar(page?: number): void {
    this.db.getSimilar(this.media_type, this.media_id, page).subscribe({
      next: (response) => {
        // console.log(response);
        this.similar = response;
      },
    });
  }

  fetchVideos(): void {
    this.db.getVideos(this.media_type, this.media_id).subscribe({
      next: (response) => {
        // console.log(response);
        this.videos = response;
      },
    });
  }

  fetchProviders(): void {
    this.db.getProviders(this.media_type, this.media_id).subscribe({
      next: (response) => {
        if (response.results?.BG?.flatrate) {
          this.providers = response.results.BG.flatrate;
        }
      },
    });
  }

  isDataReady(data: any): boolean {
    return Object.values(data).length !== 0;
  }

  setReviewIndex(index: number): void {
    // console.log(index);
    this.reviewIndex = index;
  }

  setVideoIndex(index: number): void {
    // console.log(index);
    this.videoIndex = index;
  }

  returnVideoUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
  }
}
