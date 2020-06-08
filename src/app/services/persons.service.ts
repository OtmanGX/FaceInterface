import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PersonsService extends APIService {

  private _currentPerson;
  baseurl = 'http://localhost:8000/persons/';
  constructor(public http: HttpClient) {
    super(http);
  }

  get currentPerson() {
    return this._currentPerson;
  }

  set currentPerson(value) {
    this._currentPerson = value;
  }
}
