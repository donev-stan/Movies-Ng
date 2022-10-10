import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './details/details.component';

import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './home/preview/preview.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: ':id/:type',
        component: PreviewComponent,
      },
    ],
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
