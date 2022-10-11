import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './details/details.component';

import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './home/preview/preview.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: PreviewComponent },
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
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
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
