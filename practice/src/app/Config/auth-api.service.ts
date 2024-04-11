import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';


const SERVER_CONTEXT = "/quanan";
const SERVER = "http://localhost:8080";

export const endpointsAuth = {
  currentUser: `${SERVER}${SERVER_CONTEXT}/api/current-user/`,
  pay: `${SERVER}${SERVER_CONTEXT}/api/pay_paypal/`,
  datban: `${SERVER}${SERVER_CONTEXT}/api/datban/`,
  payOff: `${SERVER}${SERVER_CONTEXT}/api/payoffline/`,
  changePassword: `${SERVER}${SERVER_CONTEXT}/api/doimatkhau/`,
  comments: (storeId: any) =>  `${SERVER}${SERVER_CONTEXT}/api/stores/${storeId}/comments/`,
  addcomment: `${SERVER}${SERVER_CONTEXT}/api/comments/`
};

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get(endpoint: string) {
    return this.http.get(endpoint, {

      headers: {
        Authorization: this.cookieService.get('token'),
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json'
        // 'Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS',
        // "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  post(endpoint: string, body: any) {
    return this.http.post(endpoint, body, {
      observe: 'response',
      responseType: 'text',
      headers: {
        Authorization: this.cookieService.get('token'),
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  put(endpoint: string, body: any) {
    return this.http.put(endpoint, body, {
      headers: {
        Authorization: this.cookieService.get('token'),
      },
    });
  }

  delete(endpoint: string) {
    return this.http.delete(endpoint, {
      headers: {
        Authorization: this.cookieService.get('token'),
      },
    });
  }
}
