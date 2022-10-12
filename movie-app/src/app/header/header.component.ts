import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDBService } from '../shared/services/movie-db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  copyLink: string = 'https://tmdb-stan.web.app';

  constructor(
    private db: MovieDBService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.db.isLoggedIn();
    this.db.loggedIn.subscribe({
      next: (loggedIn) => {
        this.loggedIn = loggedIn;
      },
    });
  }

  confirmCopy(): void {
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onLogout(): void {
    this.db.logout();
  }
}
