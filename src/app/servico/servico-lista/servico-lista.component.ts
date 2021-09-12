import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { ServicoBusca } from './servicoBusca';

@Component({
  selector: 'app-servico-lista',
  templateUrl: './servico-lista.component.html',
  styleUrls: ['./servico-lista.component.css']
})
export class ServicoListaComponent implements OnInit {

  nome: string = "";
  mes: number = 1;
  meses: number[];
  servicoBusca: ServicoBusca[] = [];
  messagem?: string;
  visible: boolean = false;

  constructor(private serviceServico: ServicoService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  ngOnInit(): void {
  }

  pesquisar() {
    this.serviceServico.pesquisa(this.nome, this.mes)
      .subscribe(
        servicos => {
          this.servicoBusca = servicos
          if(this.servicoBusca.length <= 0){
            this.messagem = "Nenhum Registro encontrado"
            this.visible = true
          }else{
            this.visible = false
          }
        }
      )
  }
}
