import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  copyLink: string = 'https://tmdb-stan.web.app';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  confirmCopy(): void {
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
