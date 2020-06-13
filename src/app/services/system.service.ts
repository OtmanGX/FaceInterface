import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  baseurl = 'http://localhost:8000/system';
  constructor(protected http: HttpClient) { }

  getTrainInfo(): Observable<any> {
    return this.http.get(([this.baseurl, 'train_info'].join('/')));
  }

  train(): Observable<any> {
    return this.http.get(([this.baseurl, 'train'].join('/')));
  }

  getConfig(): Observable<any> {
    return this.http.get(([this.baseurl, 'conf'].join('/')));
  }

  setConfig(data): Observable<any> {
    return this.http.post(([this.baseurl, 'conf'].join('/')), data);
  }

  getState(): Observable<any> {
    return this.http.get(([this.baseurl, 'running'].join('/')));
  }
}
