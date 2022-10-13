import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _state = {
    isLoggedIn: new BehaviorSubject<boolean>(false),
    isAdmin: new BehaviorSubject<boolean>(true),
  };

  get isLoggedIn() {
    return this._state.isLoggedIn.asObservable();
  }
  get isAdmin() {
    return this._state.isAdmin.asObservable();
  }

  register() {}

  login() {}

  getRefreshToken() {}
  
  logout() {}
}
