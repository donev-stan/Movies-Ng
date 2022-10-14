import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { AccountData } from '../models/account-data';
import { ResponseData } from '../models/response-data';

@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  private api_url: string = 'https://api.themoviedb.org/3';
  private api_key: string = '93e30ea468c15181b1cf21a3ae6255c1';
  private account: AccountData = {
    session_id: '404',
    account_id: 404,
    account_username: '404',
  };

  private params = new HttpParams()
    .set('api_key', this.api_key)
    .set('language', 'en-US');

  arrayLength: number = 12;
  loggedIn: Subject<string | boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    const found = JSON.parse(localStorage.getItem('login_data')!);

    if (found) {
      this.account.session_id = found.session_id;
      this.account.account_id = found.account_id;
      this.account.account_username = found.account_username;
      this.loggedIn.next(this.account.account_username);
      return true;
    }

    return false;
  }

  // Favorites
  getFavorites(
    media_type: string = 'movies',
    page: number = 1
  ): Observable<any> {
    const url = this.api_url.concat(
      `/account/${this.account.account_id}/favorite/${media_type}`
    );
    const params = this.params
      .append('session_id', this.account.session_id)
      .append('page', page);

    return this.http.get(url, { params });
  }

  postFavorite(media_type: string, media_id: number, favorite: boolean) {
    const url = this.api_url.concat(
      `/account/${this.account.account_id}/favorite`
    );
    const params = this.params.append('session_id', this.account.session_id);
    const body = {
      media_type,
      media_id,
      favorite,
    };

    return this.http.post(url, body, { params });
  }

  // Watchlist
  getWatchlist(
    media_type: string = 'movies',
    page: number = 1
  ): Observable<any> {
    const url = this.api_url.concat(
      `/account/${this.account.account_id}/watchlist/${media_type}`
    );
    const params = this.params
      .append('session_id', this.account.session_id)
      .append('page', page);

    return this.http.get(url, { params });
  }

  postWatchlist(media_type: string, media_id: number, watchlist: boolean) {
    const url = this.api_url.concat(
      `/account/${this.account.account_id}/watchlist`
    );
    const params = this.params.append('session_id', this.account.session_id);
    const body = {
      media_type,
      media_id,
      watchlist,
    };

    return this.http.post(url, body, { params });
  }

  // Authentication
  isLoggedIn(): boolean {
    return this.account.session_id !== '';
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
                    // this.session_id = response.session_id;

                    this.getAccountInfo(response.session_id).subscribe({
                      next: (account: any) => {
                        this.account.session_id = response.session_id;
                        this.account.account_id = account.id;
                        this.account.account_username = account.username;

                        console.log(this.account);

                        this.loggedIn.next(this.account.account_username);

                        localStorage.setItem(
                          'login_data',
                          JSON.stringify({
                            session_id: this.account.session_id,
                            account_id: this.account.account_id, // ???
                            account_username: this.account.account_username,
                          })
                        );
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
      session_id: this.account.session_id,
    };

    return new Promise((resolve, reject) => {
      this.http.delete(url, { params: this.params, body: body }).subscribe({
        next: (response: any) => {
          // this.account =;
          this.loggedIn.next(false);
          localStorage.removeItem('login_data');
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

  private getAccountInfo(session_id: string): Observable<any> {
    const url = this.api_url.concat(`/account`);
    const params = this.params.append('session_id', session_id);

    return this.http
      .get(url, { params })
      .pipe(tap((response) => console.log(response)));
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
