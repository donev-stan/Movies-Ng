import { Component, HostListener, OnInit } from '@angular/core';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // itemsCount: Subject<number> = new Subject();

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    console.log(`Window Width: ${window.innerWidth}`);
    this.calculateCardsCount(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateCardsCount(event.target.innerWidth);
  }

  calculateCardsCount(width: number): void {
    if (width < 460) {
      // this.itemsCount.next(6);
      this.db.arrayLength = 6;
    } else if (width < 1130) {
      // this.itemsCount.next(12);
      this.db.arrayLength = 12;
    } else if (width < 1540) {
      // this.itemsCount.next(10);
      this.db.arrayLength = 10;
    } else if (width < 1745) {
      // this.itemsCount.next(14);
      this.db.arrayLength = 14;
    } else {
      // this.itemsCount.next(16);
      this.db.arrayLength = 16;
    }
  }
}
