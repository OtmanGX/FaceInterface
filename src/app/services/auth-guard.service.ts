import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService) {}

  canActivate(): boolean {
    let value = this.auth.isAuthenticated();
    // if (value) this.auth.checkToken();
    return value;
  }
}
