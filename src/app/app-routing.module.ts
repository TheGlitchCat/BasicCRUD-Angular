import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthorsComponent} from './components/authors/authors.component';
import {BooksComponent} from './components/books/books.component';
import {LibrariesComponent} from './components/libraries/libraries.component';


const routes: Routes = [
  {path: '', redirectTo: 'authors', pathMatch: 'full'},
  {path: 'authors', component: AuthorsComponent},
  {path: 'books', component: BooksComponent},
  {path: 'libraries', component: LibrariesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
