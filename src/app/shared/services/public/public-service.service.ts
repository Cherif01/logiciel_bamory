import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class PublicServiceService {
  constructor(private http: HttpClient) {}

  // CREATE
  create(api: string, suffixURL: string, data: any): Observable<any> {
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // CREATE GLOBAL
  update(api: string, suffixUrl: string, data: any, id: any): Observable<any> {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
    return this.http.post(url, data);
  }

  updateByURL(
    api: string,
    suffixURL: string,
    id: number,
    data: any
  ): Observable<any> {
    return this.http.put(`${BASE_URL}${api}/${suffixURL}/${id}`, data);
  }

  // CREATE GLOBAL
  update_(api: string, suffixUrl: string, id: any): Observable<any> {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
    return this.http.put(url, id);
  }

  // CREATE GLOBAL
  update_4(
    api: string,
    suffixUrl: string,
    body: any,
    id: any
  ): Observable<any> {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
    return this.http.put(url, body);
  }

  // READ GLOBAL
  getall(api: string, suffixUrl: string): Observable<any> {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`);
  }

  // GET ONE
  getInURL(api: string, suffixUrl: string, id_: any) {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id_}/`;
    return this.http.get<any[]>(url);
  }

  getoneParams(api: string, suffixUrl: string, id_: any) {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id_}/`;
    const params = {
      params: { id: id_ },
    };
    return this.http.get<any[]>(url, params);
  }

  // Delete Unique
  delete(api: string, suffixUrl: any, id: any): Observable<boolean> {
    return this.http.delete<boolean>(`${BASE_URL}${api}/${suffixUrl}/${id}/`);
  }

  // Delete Unique
  deleteByPost(api: string, suffixURL: string, id: any): Observable<any> {
    return this.http.post(`${BASE_URL}${api}/${suffixURL}/${id}`, id);
  }

  // IMPRESSION
  openPrint(data: any) {
    const printWindow = window.open('', '', 'width=800,height=1000');

    const html = `
      <html>
        <head>
          <title>Impression</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
          <app-print-layout></app-print-layout>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            }
          </script>
        </body>
      </html>
    `;

    printWindow?.document.write(html);
    printWindow?.document.close();
  }
}
