import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Book} from '../../models/user.model';

@Component({
  selector: 'app-pantalla2',
  templateUrl: './pantalla2.component.html',
  styleUrls: ['./pantalla2.component.css']
})
export class Pantalla2Component implements OnInit {

  msgText: string;

  books: Object = [];

  bookForm: FormGroup;

  option = 'Send';

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

  }

  showBook(book){
    console.log(book.id, book.name);
    this.bookForm = this.fb.group({
      id: book.id,
      title: book.title,
      author: book.author
    });
  }

  editBook(book){
    this.option = 'Edit';
    console.log(book.id, book.name);
    this.bookForm = this.fb.group({
      id: book.id,
      title: book.title,
      author: book.author
    });
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
