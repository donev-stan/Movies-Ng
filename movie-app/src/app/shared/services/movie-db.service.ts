import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { ResponseData } from '../models/response-data';

@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  private api_url: string = 'https://api.themoviedb.org/3';
  private api_key: string = '93e30ea468c15181b1cf21a3ae6255c1';
  private session_id: string = '';
  private account: any = {};

  private params = new HttpParams()
    .set('api_key', this.api_key)
    .set('language', 'en-US');

  arrayLength: number = 12;
  loggedIn: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
    const found = localStorage.getItem('session_id');

    if (found) {
      this.session_id = found;
      this.loggedIn.next(true);
    }
  }

  getFavorites(media_type: string = 'movies') {
    const url = this.api_url.concat(`/account/{this.}/favorite/movies`);
  }

  getAccountInfo(): Observable<any> {
    const url = this.api_url.concat(`/account`);
    const params = this.params.append('session_id', this.session_id);

    return this.http
      .get(url, { params })
      .pipe(tap((response) => console.log(response)));
  }

  // Authentication
  isLoggedIn(): boolean {
    return this.session_id !== '';
  }

  login(loginData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.createRequestToken().subscribe({
        next: (response: any) => {
          this.validateWithLogin(response.request_token, loginData).subscribe({
            next: (response: any) => {
              this.createSession(response.request_token).subscribe({
                next: (response: any) => {
                  if (response.success) {
                    this.session_id = response.session_id;
                    this.getAccountInfo().subscribe({
                      next: (account: any) => {
                        this.account.id = account.id;
                        this.account.username = account.username;

                        this.loggedIn.next(true);
                        localStorage.setItem('session_id', this.session_id);
                        resolve(true);
                      },
                      error: (error: any) => reject(error),
                    });
                  }
                },
                error: (error: any) => reject(error),
              });
            },
            error: (error: any) => reject(error),
          });
        },
        error: (error: any) => reject(error),
      });
    });
  }

  logout(): Promise<boolean> {
    const url = this.api_url.concat('/authentication/session');
    const body = {
      session_id: this.session_id,
    };

    return new Promise((resolve, reject) => {
      this.http.delete(url, { params: this.params, body: body }).subscribe({
        next: (response: any) => {
          this.session_id = '';
          this.loggedIn.next(false);
          localStorage.removeItem('session_id');
          resolve(true);
        },
        error: (err: any) => {
          reject(false);
        },
      });
    });
  }

  private createRequestToken() {
    const url = this.api_url.concat('/authentication/token/new');

    return this.http.get(url, { params: this.params });
  }

  private validateWithLogin(token: string, loginData: any) {
    const url = this.api_url.concat(
      '/authentication/token/validate_with_login'
    );

    const body = {
      // username: 'donev-stan',
      // password: '6cbT6YW9mp.GpqF',
      ...loginData,
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
  // --- END: Authentication ---

  getTrending(
    media_type: string = 'all',
    time_window: string = 'day',
    page: number = 1
  ): Observable<ResponseData> {
    const url = this.api_url.concat(`/trending/${media_type}/${time_window}`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      map((response: any) => ({
        ...response,
        results: response.results.slice(0, this.arrayLength),
      }))
    );
  }

  getTopRated(
    media_type: string = 'movie',
    page: number = 1
  ): Observable<ResponseData> {
    const url = this.api_url.concat(`/${media_type}/top_rated`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      map((response: any) => ({
        ...response,
        results: response.results.slice(0, this.arrayLength),
      }))
    );
  }

  getPopular(
    media_type: string = 'movie',
    page: number = 1
  ): Observable<ResponseData> {
    const url = this.api_url.concat(`/${media_type}/popular`);
    const params = this.params.append('page', page);

    return this.http.get(url, { params }).pipe(
      map((response: any) => ({
        ...response,
        results: response.results.slice(0, this.arrayLength),
      }))
    );
  }

  discover(searchFilters: any, page: number = 1): Observable<any> {
    const url = this.api_url.concat(`/search/${searchFilters.selectedMedia}`);
    const params = this.params
      .append('query', searchFilters.query)
      .append('page', page)
      .append('sort_by', searchFilters.selectedSort)
      .append('with_genres', searchFilters.selectedGenres);

    return this.http
      .get(url, { params })
      .pipe(tap((data) => console.log(data)));
  }

  getGenres(
    media_type: string = 'movie'
  ): Observable<{ id: number; name: string }[]> {
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

  // Not in use
  multiSearch(
    query: string,
    media_type: string,
    page: number = 1
  ): Observable<any> {
    const url = this.api_url.concat(`/search/${media_type}`);
    const params = this.params
      .append('query', query)
      .append('page', page)
      .append('include_adult', true);

    return this.http
      .get(url, { params })
      .pipe(tap((response) => console.log(response)));
  }
}
