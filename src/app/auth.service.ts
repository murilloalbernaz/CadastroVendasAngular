import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './login/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiURL;
  token_url: string = environment.apiURL + environment.token_url;
  client_id: string = environment.client_id;
  client_secret: string = environment.client_secret;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }

  cadastrarUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user/salvar`, user);
  }

  logar(user: User): Observable<any> {
    let params = new HttpParams();
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.client_id}:${this.client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (user.username != null && user.password != null) {
      params = new HttpParams()
        .set('username', user.username)
        .set('password', user.password)
        .set('grant_type', 'password')
    }
    return this.http.post(this.token_url, params.toString(), { headers })
  }

  isAuthenticate(): boolean {
    let token = this.obterToken();
    if(token != null){
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
  }

  obterToken() {
    let tokenString = localStorage.getItem('access_token')
    let jwt: string = '';
    let token
    if (tokenString != null) {
      token = JSON.parse(tokenString)
      jwt = token.access_token
      return jwt;
    }
    return null;
  }

  encerrarSecao(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token !=null){
      const nomeUser = this.jwtHelper.decodeToken(token).user_name;
      return nomeUser;
    }
    return null;
  }
}
