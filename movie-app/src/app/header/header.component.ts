import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    db.loggedIn.subscribe({
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

  ngOnInit(): void {
    this.db.checkLoggedIn();
  }

  confirmCopy(): void {
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onLogout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Logout',
        message: 'Are you sure you want to log out?',
        actions: {
          main: {
            text: 'Logout',
          },
          secondary: {
            text: 'Cancel',
          },
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.db.logout().then((success) => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
