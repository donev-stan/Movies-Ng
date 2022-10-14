import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { DetailsComponent } from './details/details.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { TrendingComponent } from './home/trending/trending.component';
import { SectionPanelComponent } from './home/shared/section-panel/section-panel.component';
import { TopRatedComponent } from './home/top-rated/top-rated.component';
import { PopularComponent } from './home/popular/popular.component';
import { PreviewComponent } from './home/preview/preview.component';
import { LoginComponent } from './login/login.component';
// import { CardComponent } from './browse/card/card.component';
import { FiltersComponent } from './browse/filters/filters.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteComponent } from './profile/favorite/favorite.component';
import { RatedComponent } from './profile/rated/rated.component';
import { WatchlistComponent } from './profile/watchlist/watchlist.component';
import { MyListComponent } from './profile/my-list/my-list.component';
import { ProfilePanelComponent } from './profile/shared/profile-panel/profile-panel.component';
import { CardComponent } from './shared/components/card/card.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BrowseComponent,
    DetailsComponent,
    CategoriesComponent,
    TrendingComponent,
    SectionPanelComponent,
    TopRatedComponent,
    PopularComponent,
    PreviewComponent,
    LoginComponent,
    FiltersComponent,
    ProfileComponent,
    FavoriteComponent,
    RatedComponent,
    WatchlistComponent,
    MyListComponent,
    ProfilePanelComponent,
    CardComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
