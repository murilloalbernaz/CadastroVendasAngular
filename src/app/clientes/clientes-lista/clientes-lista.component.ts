import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clienteLista: Cliente[] = [];
  clienteSelecionado: Cliente = new Cliente();
  mensagemerro?: string;
  mensagemsucesso?:string;

  constructor(private service: ClientesService, private router: Router) {

  }

  ngOnInit(): void {
    this.service.getClientes()
      .subscribe(
        response => {
          this.clienteLista = response;
        }
      )
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    console.log(this.clienteSelecionado)
  }

  deletar() {
    this.service.deletar(this.clienteSelecionado).subscribe(
      response => {
        this.mensagemsucesso = 'cliente deletado com sucesso'
        this.ngOnInit();
      },
      erro =>this.mensagemerro = 'ocorreu erro ao deletar esse cliente'
    )
  }

}
