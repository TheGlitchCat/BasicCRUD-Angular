import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlRoot = 'http://localhost:3000';
  urlBooks = 'http://localhost:3000/books';
  urlAuthors = 'http://localhost:3000/authors';
  urlLibraries = 'http://localhost:3000/libraries';

  constructor(private http: HttpClient) { }

  // BOOKS
  getBooks(){
    return this.http.get(this.urlBooks);
  }

  postBooks(params){
    return this.http.post(this.urlBooks, params);
  }

  putBooks(bookId, params){
    return this.http.put(this.urlBooks + '/' + bookId, params);
  }

  deleteBooks(bookId){
    return this.http.delete(this.urlBooks + '/' + bookId);
  }

  // AUTHORS
  getAuthors(){
    return this.http.get(this.urlAuthors);
  }

  postAuthors(params){
    return this.http.post(this.urlAuthors, params);
  }

  putAuthors(authorId, params){
    return this.http.put(this.urlAuthors + '/' + authorId, params);
  }

  deleteAuthors(authorId){
    return this.http.delete(this.urlAuthors + '/' + authorId);
  }

  // LIBRARIES
  getLibraries(){
    return this.http.get(this.urlLibraries);
  }

  postLibraries(params){
    return this.http.post(this.urlLibraries, params);
  }

  putLibraries(libraryId, params){
    return this.http.put(this.urlLibraries + '/' + libraryId, params);
  }

  deleteLibraries(libraryId){
    return this.http.delete(this.urlLibraries + '/' + libraryId);
  }

  // GENERICS
  get(url: string){
    return this.http.get(url);
  }

  post(url, params){
    return this.http.post(url, params);
  }

  put(url, params){
    return this.http.put(url, params);
  }

  delete(url){
    return this.http.delete(url);
  }


}
