import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MovieDBService } from 'src/app/shared/services/movie-db.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  listIds: any[] = [];
  lists: any[] = [];

  constructor(private db: MovieDBService) {}

  ngOnInit(): void {
    this.db
      .getLists()
      .pipe(
        map((response: any) => response.results.map((list: any) => list.id))
      )
      .subscribe({
        next: (listIds: []) => {
          console.log(listIds);
          this.listIds = listIds;

          this.listIds.map((listId) => {
            this.db.getListDetails(listId).subscribe({
              next: (response: any) => {
                this.lists.push({
                  id: response.id,
                  name: response.name,
                  description: response.description,
                  items: response.items,
                });
                console.log(this.lists);
              },
            });
          });
          // console.log(data.results);
          // this.lists = data.results;

          // this.lists = this.lists.map((list: any) => {
          //   return {
          //     id: list.id,
          //     name: list.name,
          //     description: list.description,
          //   };
          // });

          // console.log(this.lists);

          // this.db.getListDetails(this.lists[0].id).subscribe({
          //   next: (response) => {
          //     console.log(response);
          //   },
          // });
        },
      });
  }
}
