import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import{ClientesFormComponent} from './clientes-form/clientes-form.component'
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
const routes: Routes = [
  {path: '', component: LayoutComponent, children:[
    {path: 'clientes-form', component: ClientesFormComponent},
    {path: 'clientes-form/:id', component: ClientesFormComponent},
    {path: 'clientes-list', component: ClientesListaComponent},
    //{path: 'clientes', redirectTo: '/clientes-list', pathMatch: 'full'}
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
