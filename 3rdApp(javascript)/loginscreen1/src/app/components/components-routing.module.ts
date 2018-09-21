import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Componentscomponent } from './components.component';

const routes: Routes = [
  { path: '' , component: Componentscomponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
