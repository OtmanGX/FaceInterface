import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AlertController, Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {error} from "util";

const TOKEN_KEY = 'access_token';
const TOKEN_REFRESH_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  user = null;
  authenticateState = new BehaviorSubject(false);
    private body: { refresh: Promise<any> };
  constructor(
      private http: HttpClient,
      private helper: JwtHelperService,
      private storage: Storage,
      private plt: Platform,
      private alertController: AlertController

  ) {
      this.plt.ready().then(
        () => {this.checkToken(); });
  }

  public isTokenExpired() {
      this.storage.get(TOKEN_KEY).then(token => {
          return this.helper.isTokenExpired(token);
      }, error => {return false;});
  }

  public checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.authenticateState.next(true);
        } else {
          console.log('token expired');
          this.storage.remove(TOKEN_KEY);
          // this.getAccessTokenUsingRefreshToken();
          this.refreshToken();
        }
      }
    });
    // return this.refreshToken();
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
        catchError(err => {
          this.showAlert(err.error.msg);
          throw new Error(err);
        })
    );
  }

  login(credentials) {
    return this.http.post(`${this.url}/api/token/`, credentials)
        .pipe(
            tap(res => {
              this.storage.set(TOKEN_KEY, res['access']);
              this.storage.set(TOKEN_REFRESH_KEY, res['refresh']);
              this.user = this.helper.decodeToken(res['access']);
              this.authenticateState.next(true);
            }),
            catchError(err => {
              this.showAlert(err.error.msg);
              throw new Error(err);
            })
        );
  }

    getAccessTokenUsingRefreshToken(): Observable<string> {
      console.log('getAccessTokenUsingRefreshToken');
        return from(this.storage.get(TOKEN_REFRESH_KEY)).pipe(
            switchMap(refreshToken => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`
                    })
                };
                return this.http.post<any>(`${this.url}/token/refresh`, {}, httpOptions);
            }),
            map(response => response.access_token),
            tap(accessToken => this.storage.set(TOKEN_KEY, accessToken))
        );
    }

  async refreshToken() {
      const refresh = this.storage.get(TOKEN_REFRESH_KEY);
      const options = new HttpParams()
          .set('refresh', await refresh);
      return this.http.post<any>(`${this.url}/api/token/refresh/`, options
      ).subscribe(
          res => {
              this.storage.set(TOKEN_KEY, res['access']);
              this.user = this.helper.decodeToken(res['access']);
              this.authenticateState.next(true);
          }
      );
      // console.log(value);
      //   const options = new HttpParams()
      //       .set('refresh', value);
      //   return this.http.post<any>(`${this.url}/api/token/refresh`, {options}
      // ).subscribe(
      //         res => {
      //           console.log('oh yes');
      //           this.storage.set(TOKEN_KEY, res['access']);
      //           this.user = this.helper.decodeToken(res['access']);
      //           this.authenticateState.next(true);
      //         }
      //     );
      // }
      // );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticateState.next(false);
    });
    this.storage.remove(TOKEN_REFRESH_KEY);
  }

  // getSpecialData() {
  //   return this.http.get(`${this.url}/api/special`).pipe(
  //       catchError(err => {
  //         let status = err.status;
  //         if (status === 401 ) {
  //           this.showAlert(error.error.msg);
  //           this.logout();
  //         }
  //         throw new Error(err);
  //       })
  //   );
  // }

  isAuthenticated() {
    return this.authenticateState.value;
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message : msg,
      header : 'Error',
      buttons : ['OK']
    });
    // tslint:disable-next-line:no-shadowed-variable
    alert.then(alert => alert.present());
  }
}
