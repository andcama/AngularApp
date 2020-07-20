import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNoEncontradaComponent } from './PaginaNoEncontrada/PaginaNoEncontrada.component';
import { ToDoListComponent } from './ToDoList/ToDoList.component';
import { FormularioReactiveComponent } from './FormularioReactive/FormularioReactive.component';

const routes: Routes = [
  { path: 'todolist', component: ToDoListComponent },
  { path: 'formularioreactive', component: FormularioReactiveComponent },
  { path: '#', component: PaginaNoEncontradaComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
