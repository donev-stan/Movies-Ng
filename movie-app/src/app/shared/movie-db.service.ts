import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  private api_url = 'https://api.themoviedb.org/3';
  private api_key = '93e30ea468c15181b1cf21a3ae6255c1';
  private session_id = '';

  private params = new HttpParams()
    .set('api_key', this.api_key)
    .set('language', 'en-US');

  arrayLength: number = 12;

  constructor(private http: HttpClient) {}

  login(loginData: any) {
    this.createRequestToken().subscribe({
      next: (response: any) => {
        console.log('Success Token');
        console.log(response);

        this.validateWithLogin(loginData).subscribe({
          next: (response: any) => {
            console.log('Success Login');
            console.log(response);

            this.createSession(response.request_token).subscribe({
              next: (response: any) => {
                console.log('Success Session!');
                console.log(response);
                // Set session ID
              },
            });
          },
        });
      },
    });
  }

  private createRequestToken() {
    const url = this.api_url.concat('/authentication/token/new');

    return this.http
      .get(url, { params: this.params })
      .pipe(tap((response) => console.log(response)));
  }

  private validateWithLogin(token: string) {
    const url = this.api_url.concat(
      '/authentication/token/validate_with_login'
    );

    const body = {
      username: 'donev-stan',
      password: '6cbT6YW9mp.GpqF',
      request_token: token,
    };

    return this.http.post(url, body, { params: this.params });
  }

  private createSession(token: string) {
    const url = this.api_url.concat('/authentication/session/new');
    const body = {
      request_token: token,
    };

    return this.http.post(url, body, { params: this.params });
  }

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
      map((response: any) => response.slice(0, this.arrayLength))
      // tap((response) => console.log(response))
    );
  }

  getTopRated(
    media_type: string = 'movie',
    page: number = 1
  ): Observable<any[]> {
    const url = this.api_url.concat(`/${media_type}/top_rated`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      map((response: any) => response.results),
      map((response: any) => response.slice(0, this.arrayLength))
      // tap((response) => console.log(response))
    );
  }

  getPopular(
    media_type: string = 'movie',
    page: number = 1
  ): Observable<any[]> {
    const url = this.api_url.concat(`/${media_type}/popular`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      // tap((response) => console.log(response)),
      map((response: any) => response.results),
      map((response: any) => response.slice(0, this.arrayLength))
      // tap((response) => console.log(response))
    );
  }

  getLatest(media_type: string = 'movie'): Observable<any> {
    const url = this.api_url.concat(`/${media_type}/popular`);

    return this.http
      .get(url, { params: this.params })
      .pipe(tap((response) => console.log(response)));
  }

  multiSearch(query: string, page: number = 1): Observable<any> {
    const url = this.api_url.concat(`/search/multi`);
    const params = this.params
      .append('query', query)
      .append('page', page)
      .append('include_adult', true);

    return this.http
      .get(url, { params })
      .pipe(tap((response) => console.log(response)));
  }

  getGenres(media_type: string = 'movie'): Observable<any[]> {
    const url = this.api_url.concat(`/genre/${media_type}/list`);

    return this.http
      .get(url, { params: this.params })
      .pipe(map((response: any) => response.genres));
  }

  getSingle(media_type: string, id: string): Observable<any> {
    const url = this.api_url.concat(`/${media_type}/${id}`);
    // const params = this.params.append('append_to_response', 'videos,images');

    return this.http.get(url, { params: this.params });
    // .pipe(tap((response) => console.log(response)));
  }

  getLatestMovie(): Observable<any> {
    const url = this.api_url.concat(`/movie/latest`);

    return this.http.get(url, { params: this.params });
    // .pipe(tap((response) => console.log(response)));
  }
}
