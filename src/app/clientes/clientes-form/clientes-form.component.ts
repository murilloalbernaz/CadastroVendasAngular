import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service'
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente
  success: boolean = false;
  errors?: string[];

  constructor(private service: ClientesService, private router: Router, private activtedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activtedRoute.params
    if (params.forEach.length != 0)
      this.buscaCliente(params)
  }

  buscaCliente(params: Observable<Params>) {
    params.subscribe(
      param => {
        this.service
          .getCliente(param.id)
          .subscribe(cliente =>
            this.cliente = cliente
          )
      }
    )
  }

  onSubimit() {
    if (this.cliente.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(response =>
          this.success=true
        )
    } else {
      this.service
        .salvar(this.cliente)
        .subscribe(
          response => {
            this.success = true
            this.errors = [];
            this.cliente = response;
          }, errorResponse => {
            this.success = false
            this.errors = errorResponse.error.erros;
          }
        )
    }
  }

  voltar() {
    this.router.navigate(['/clientes-list'])
  }
}
