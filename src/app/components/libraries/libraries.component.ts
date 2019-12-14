import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Book, Library} from '../../models/models.model';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {

  msgText: string;

  libraries: object = [];
  books: object = [];

  libraryForm: FormGroup;

  option = 'Send';

  card = {
    title: '',
    desc: '',
  };

  isLoaded = false;

  constructor(protected service: DataService, protected fb: FormBuilder) {

    this.libraryForm = this.fb.group({
      id: null,
      name: '',
      address: '',
      books: []
    });

  }

  ngOnInit() {

    this.service.getBooks().subscribe((data) => {
      console.log(data);
      this.books = data as Book[];
    }, (error) => {
      this.msgText = error.message;
    }, () => {
      setTimeout(() => {
        // @ts-ignore
        $('.selectpicker').selectpicker('refresh');
      });
    });

    this.service.getLibraries().subscribe((data) => {
      console.log(data);
      this.libraries = data as Library[];
    }, (error) => {
      this.msgText = error.message;
    }, () => {
      this.isLoaded = true;
    });

  }

  refreshSelect() {
    // @ts-ignore
    $('.selectpicker').selectpicker('refresh');
  }

  showLibrary(library){
    console.log(library.id, library.name);
    this.libraryForm = this.fb.group({
      id: library.id,
      name: library.name,
      address: library.address,
      books: library.books
    });
    this.card.title = library.name;
    this.card.desc = library.address;
    this.option = 'Edit';
  }

  deleteLibrary(library){
    console.log(library.id, library.name);
    this.service.deleteLibraries(library.id).subscribe((data) => {
      console.log(data);
    }, (error) => {this.msgText = error.message;}, () => {
      this.reloadData();
    });

  }

  onSubmit(data){
    console.log(data);
    if (this.option == 'Send'){
      this.service.postLibraries(data).subscribe((data) => {
      }, (error) => {this.msgText = error.message; console.log(error)}, () => {
        this.reloadData();
      });
    }

    if (this.option == 'Edit'){
      this.service.putLibraries(data.id, data).subscribe((data) => {},
        (error) => {this.msgText = error.message;},
        () => {this.reloadData()});
    }


    this.option = 'Send';
  }

  reloadData(){
    this.resetItems();
    this.service.getLibraries().subscribe((data) => {
      this.libraries = data as Library[]
    }, (error) => {
      this.msgText = error.message;
    }, () => {
      this.isLoaded = true;
    });
  }

  resetItems(){
    this.libraries = [];
    this.isLoaded = false;
    this.card = {
      title: '',
      desc: '',
    };

    this.libraryForm = this.fb.group({
      id: null,
      name: '',
      address: '',
      books: []
    });
  }

}
