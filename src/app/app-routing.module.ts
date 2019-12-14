import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Pantalla3Component} from './components/pantalla3/pantalla3.component';
import {AuthorsComponent} from './components/authors/authors.component';
import {BooksComponent} from './components/books/books.component';


const routes: Routes = [
  {path: '', redirectTo: 'authors', pathMatch: 'full'},
  {path: 'authors', component: AuthorsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'libraries', component: Pantalla3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
