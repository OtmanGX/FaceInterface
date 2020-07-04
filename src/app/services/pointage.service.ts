import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PointageService extends APIService{

  baseurl = 'http://localhost:8000/pointage/';
  constructor(public http: HttpClient) {
    super(http);
  }
}
