import { Component } from '@angular/core';
import { MovieDBService } from './shared/services/movie-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private db: MovieDBService) {}

  ngOnInit() {
    // this.db.createRequestToken().subscribe({
    //   next: (response: any) => {
    //     this.db.login(response.request_token).subscribe({
    //       next: (response: any) => {
    //         console.log(response);
    //         this.db.createSession(response.request_token).subscribe({
    //           next: (response: any) => {
    //             console.log(response);
    //           },
    //         });
    //       },
    //     });
    //   },
    // });
  }
}
