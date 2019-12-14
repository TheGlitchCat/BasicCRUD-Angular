import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Pantalla2Component} from './components/pantalla2/pantalla2.component';
import {Pantalla3Component} from './components/pantalla3/pantalla3.component';
import {AuthorsComponent} from './components/authors/authors.component';


const routes: Routes = [
  {path: 'authors', component: AuthorsComponent},
  {path: 'books', component: Pantalla2Component},
  {path: 'libraries', component: Pantalla3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
