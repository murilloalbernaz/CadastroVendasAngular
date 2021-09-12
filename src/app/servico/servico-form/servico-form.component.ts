import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoService } from 'src/app/servico.service';
import { Servico } from '../servico';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.css']
})
export class ServicoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  success: boolean = false;
  servico: Servico;
  errors: string[] = [];

  constructor(private serviceCliente: ClientesService, private serviceServico: ServicoService, private router: Router) {
    this.servico = new Servico();
  }

  ngOnInit(): void {
    this.serviceCliente
      .getClientes()
      .subscribe(
        clientes => this.clientes = clientes,
        erro => this.clientes = []
      )
  }

  onSubimit() {
    this.serviceServico.salvar(this.servico)
      .subscribe(servicop => {
        this.errors = []
        this.success = true
        this.servico = new Servico();
      },
        errorsResponse => {
          this.errors = errorsResponse.error.erros;
        }
      )
  }

  voltar(){
    this.router.navigate(["/servico-lista"]);
  }
}
