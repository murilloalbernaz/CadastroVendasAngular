import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListaComponent } from './servico-lista/servico-lista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ServicoFormComponent,
    ServicoListaComponent
  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ServicoFormComponent,
    ServicoListaComponent
  ]
})
export class ServicoModule { }
