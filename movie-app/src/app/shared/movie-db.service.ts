import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  private api_url = 'https://api.themoviedb.org/3';
  private api_key = '93e30ea468c15181b1cf21a3ae6255c1';

  private params = new HttpParams()
    .set('api_key', this.api_key)
    .set('language', 'en-US');

  constructor(private http: HttpClient) {}

  getMovieGenres(): Observable<any[]> {
    const url = this.api_url.concat('/genre/movie/list');
    return this.http
      .get(url, { params: this.params })
      .pipe(map((response: any) => response.genres));
  }

  getPopularActors(page: number = 1): Observable<any> {
    const url = this.api_url.concat('/person/popular');
    const params = this.params.append('page', page);

    return this.http
      .get(url, { params })
      .pipe(
        map((response: any) =>
          response.results.filter(
            (actor: any) => actor.known_for_department === 'Acting'
          )
        )
      );
  }

  getPopularMovies(page: number = 1): Observable<any> {
    const url = this.api_url.concat('/movie/popular');
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      map((response: any) => response.results),
      tap((data) => console.log(data))
    );
  }

  getPopularShows(page: number = 1): Observable<any> {
    const url = this.api_url.concat('/tv/popular');
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      map((response: any) => response.results),
      tap((data) => console.log(data))
    );
  }
}
