import { Component, OnInit } from '@angular/core';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  lists: any[] = [];

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.db.getLists().subscribe({
      next: (data: any) => {
        console.log(data);
        this.lists = data.results;

        this.lists = this.lists.map((list) => {
          return this.db.getListDetails(list.id).subscribe({
            next: (data: any) => {
              return {
                ...list,
                items: data.items,
              };
            },
          });
        });
      },
    });
  }
}
