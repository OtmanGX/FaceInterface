import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetectedService extends APIService {

  baseurl = 'http://localhost:8000/detfaces/';
  constructor(public http: HttpClient) {
    super(http);
  }
}
