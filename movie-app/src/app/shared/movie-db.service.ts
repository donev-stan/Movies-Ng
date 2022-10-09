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

  getTrendingItems(
    media_type: string = 'all',
    time_window: string = 'day',
    page: number = 1
  ): Observable<any> {
    const url = this.api_url.concat(`/trending/${media_type}/${time_window}`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      map((response: any) => response.results),
      map((response: any) => response.slice(0, 10)),
      tap((response) => console.log(response))
    );
  }

  getTopRated(media_type: string = 'movie', page: number = 1): Observable<any> {
    const url = this.api_url.concat(`/${media_type}/top_rated`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      map((response: any) => response.results),
      map((response: any) => response.slice(0, 10))
      // tap((response) => console.log(response))
    );
  }

  getPopular(media_type: string = 'movie', page: number = 1): Observable<any> {
    const url = this.api_url.concat(`/${media_type}/popular`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      map((response: any) => response.results),
      map((response: any) => response.slice(0, 10)),
      tap((response) => console.log(response))
    );
  }

  getLatest(media_type: string = 'movie'): Observable<any> {
    const url = this.api_url.concat(`/${media_type}/popular`);

    return this.http.get(url, { params: this.params }).pipe(
      // tap((response) => console.log(response)),
      tap((response) => console.log(response))
    );
  }

  multiSearch(query: string, page: number = 1): Observable<any> {
    const url = this.api_url.concat(`/search/multi`);
    const params = this.params
      .append('query', query)
      .append('page', page)
      .append('include_adul', true);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      tap((response) => console.log(response))
    );
  }

  getGenres(media_type: string = 'movie'): Observable<any[]> {
    const url = this.api_url.concat(`/genre/${media_type}/list`);

    return this.http
      .get(url, { params: this.params })
      .pipe(map((response: any) => response.genres));
  }
}
