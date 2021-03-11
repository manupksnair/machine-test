import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() {}
  
  public isAuthenticated(): boolean {
    const userData = localStorage.getItem('userData');
    return userData ? true: false;
  }
}