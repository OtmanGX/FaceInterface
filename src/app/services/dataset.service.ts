import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasetService extends APIService{

  baseurl = 'http://localhost:8000/dataset/';
  constructor(public http: HttpClient) {
    super(http);
  }

  move(data: any) {
    return this.http.post(this.baseurl + 'move/', data);
  }
}
