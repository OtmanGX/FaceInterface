import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsService extends APIService {

  baseurl = 'http://localhost:8000/persons/';
  constructor(public http: HttpClient) {
    super(http);
  }

}
