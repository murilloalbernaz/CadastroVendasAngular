import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListaComponent } from './servico-lista/servico-lista.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'servico-form', component: ServicoFormComponent},
    {path:'servico-lista', component: ServicoListaComponent}
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
