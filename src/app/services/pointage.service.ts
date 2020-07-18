import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService} from "./api.service";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService extends APIService{

  baseurl = 'http://localhost:8000/pointage/';
  constructor(public http: HttpClient) {
    super(http);
  }


  // filter(params?): Observable<any> {
  //   return this.http.get<any>(this.baseurl+'filter_date/', {params});
  // }
}
