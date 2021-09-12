import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURL +'/api/clientes';

  constructor(private http: HttpClient) { 
  }

  salvar(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiURL}/salvar`, cliente)
  }

  atualizar(cliente: Cliente): Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente)
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiURL}/`);
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get(`${this.apiURL}/${id}`)
  }

  deletar(cliente: Cliente):Observable<any> {
    return this.http.delete(`${this.apiURL}/${cliente.id}`)
  }
}
