import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Author, Book} from '../../models/models.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  msgText: string;

  books: object = [];
  authors: object = [];

  bookForm: FormGroup;

  option = 'Send';

  card = {
    title: '',
    desc: '',
  };


  constructor(protected service: DataService, protected fb: FormBuilder) {

    this.bookForm = this.fb.group({
      id: null,
      title: '',
      author: null
    });

  }

  ngOnInit() {

    this.service.getBooks().subscribe((data) => {
      console.log(data);
      this.books = data as Book[];
    }, (error) => {
      this.msgText = error.message;
    } );
    this.service.getAuthors().subscribe((data) => {
      this.authors = data as Author[];
    });
  }

  showBook(book){
    console.log(book.id, book.name);
    this.bookForm = this.fb.group({
      id: book.id,
      title: book.title,
      author: book.author
    });
    this.card.title = book.title;
    this.card.desc = book.author;
    this.option = 'Edit';
  }

  deleteBook(book){
    console.log(book.id, book.name);
    this.service.deleteBooks(book.id).subscribe((data) => {
      console.log(data);
    }, (error) => {this.msgText = error.message;}, () => {
      this.reloadData();
    });

  }

  onSubmit(data){
    console.log(data);
    if (this.option == 'Send'){
      this.service.postBooks(data).subscribe((data) => {
      }, (error) => {this.msgText = error.message; console.log(error)}, () => {
        this.reloadData();
      });
    }

    if (this.option == 'Edit'){
      this.service.putBooks(data.id, data).subscribe((data) => {},
        (error) => {this.msgText = error.message;},
        () => {this.reloadData()});
    }


    this.option = 'Send';
  }

  reloadData(){
    this.books = [];
    this.service.getBooks().subscribe((data) => {this.books = data as Book[]}, (error) => {this.msgText = error.message;});
  }

}
