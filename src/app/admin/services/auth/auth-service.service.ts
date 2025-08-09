import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  // Http Options (de base)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  verifyState() {
    return this.http.get('/settings/verify-state');
  }

  // CREATE
  create(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // READ GLOBAL
  getList(api: string, suffixUrl: string) {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`);
  }

  authBackoffice(api: string, suffixURL: string, data: any): Observable<any> {
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  login(api: string, suffixURL: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      etablissement: data.etablissement.toString(),
    });

    const body = {
      telephone: data.telephone,
    };

    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, body, { headers });
  }

  validateOTP(api: string, suffixURL: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      etablissement: localStorage.getItem('codeEcole') ?? [],
    });

    const body = {
      telephone: localStorage.getItem('telSaved'),
      code: data.code,
    };

    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, body, { headers });
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('token') ||
      !!localStorage.getItem('user_backoffice_token')
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logoutUser(source = '') {
    localStorage.clear();
    if (source == 'backoffice') this.router.navigate(['/l-admin/auth']);
    else this.router.navigate(['/auth']);
  }
}
