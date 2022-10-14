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
  account_name: string = '';
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
      next: (username) => {
        if (username) {
          this.loggedIn = true;
          this.account_name = username as string;
        } else {
          this.loggedIn = false;
        }
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
