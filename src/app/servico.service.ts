import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servico } from './servico/servico';
import { ServicoBusca } from './servico/servico-lista/servicoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  apiURL: string = environment.apiURL +'/api/servico';

  constructor(private service: HttpClient) {
    
   }

  salvar(servico: Servico): Observable<Servico>{
    return this.service.post(`${this.apiURL}/salvar`, servico)
  }

  pesquisa(nome: string, mes: number): Observable<ServicoBusca[]>{
    const httpParams: HttpParams = new HttpParams().set("nome", nome).set("mes", mes.toString());
    return this.service.get<ServicoBusca[]>(`${this.apiURL}/mesNome?`+httpParams.toString())
  }
}
