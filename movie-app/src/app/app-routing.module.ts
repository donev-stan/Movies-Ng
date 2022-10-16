import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './details/details.component';

import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './shared/components/preview/preview.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: PreviewComponent },
      {
        path: ':type/:id',
        component: PreviewComponent,
      },
    ],
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'details/:type/:id',
    component: DetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: ':type/:id',
        component: PreviewComponent,
      },
    ],
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
