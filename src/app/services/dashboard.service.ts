import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseurl = 'http://localhost:8000';
  constructor(protected http: HttpClient) { }

  getDashboardInfo(): Observable<any> {
    return this.http.get(([this.baseurl, 'dashboard'].join('/')));
  }
}
