import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  listIds: any[] = [];
  lists: any[] = [];

  constructor(private db: MovieDBService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchLists();
  }

  fetchLists(): void {
    this.db
      .getLists()
      .pipe(
        map((response: any) => response.results.map((list: any) => list.id))
      )
      .subscribe({
        next: (listIds: []) => {
          this.listIds = listIds;

          this.listIds.map((listId) => {
            this.db
              .getListDetails(listId)
              .pipe(
                map((response: any) => ({
                  id: response.id,
                  name: response.name,
                  description: response.description,
                  items: response.items,
                }))
              )
              .subscribe({
                next: (response: any) => {
                  this.lists.push(response);
                },
              });
          });
        },
      });
  }

  // ERROR CODE: 500 (but it deletes it successfully)
  onDeleteList(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete List',
        message: 'Are you sure you want to delete this list?',
        actions: {
          main: {
            text: 'Delete',
          },
          secondary: {
            text: 'Cancel',
          },
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.db.deleteList(id).subscribe({
          next: (data) => {
            this.fetchLists();
          },
        });
      }
    });
  }

  // ERROR CODE: 401
  onClearList(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Clear List',
        message: 'Are you sure you want to clear this list?',
        actions: {
          main: {
            text: 'Clear',
          },
          secondary: {
            text: 'Cancel',
          },
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.db.clearList(id).subscribe({
          next: (data) => {
            this.fetchLists();
          },
        });
      }
    });
  }
}
