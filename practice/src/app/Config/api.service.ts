import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';


const SERVER_CONTEXT = "/quanan";
const SERVER = "http://localhost:8080";

export const endpoints = {
  foods: `${SERVER}${SERVER_CONTEXT}/api/food/`,
  login: `${SERVER}${SERVER_CONTEXT}/api/login/`,
  register: `${SERVER}${SERVER_CONTEXT}/api/dangky/`,
  chiNhanh: (idChiNhanh: any) => `${SERVER}${SERVER_CONTEXT}/api/ban/${idChiNhanh}/`,
  ban: (idBan: any) => `${SERVER}${SERVER_CONTEXT}/api/thongtinban/${idBan}/`
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get(endpoint: string) {
    return this.http.get(endpoint)
  }

  post(endpoint: string, body: any) {
    return this.http.post(endpoint, body);
  }

  login(endpoint: string, body: any) {
    return this.http.post(endpoint, body, {responseType: 'text'});
  }

  put(endpoint: string, body: any) {
    return this.http.put(endpoint, body);
  }

  delete(endpoint: string) {
    return this.http.delete(endpoint);
  }
}
