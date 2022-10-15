import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-item-dialog',
  templateUrl: './rate-item-dialog.component.html',
  styleUrls: ['./rate-item-dialog.component.scss'],
})
export class RateItemDialogComponent implements OnInit {
  rating: number = 0;

  constructor(
    private dialogRef: MatDialogRef<RateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data.ratingValue);

    this.rating = this.data.ratingValue;
  }

  postRating(): void {
    this.dialogRef.close(this.rating);
  }

  cancelRating(): void {
    this.dialogRef.close(undefined);
  }

  clearRating(): void {
    this.dialogRef.close('remove');
  }
}
