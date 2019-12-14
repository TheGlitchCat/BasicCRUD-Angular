import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Author} from '../../models/user.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  msgText: string;

  authors: Object = [];

  authorForm: FormGroup;

  option = 'Send';

  constructor(protected service: DataService, protected fb: FormBuilder) {

    this.authorForm = this.fb.group({
      id: null,
      name: ''
    });

  }

  ngOnInit() {

    this.service.getAuthors().subscribe((data) => {
      console.log(data);
      this.authors = data as Author[];
    }, (error) => {
      this.msgText = error.message;
    } );

  }

  showAuthor(author){
    console.log(author.id, author.name);
    this.authorForm = this.fb.group({
      id: author.id,
      name: author.name
    });
    this.option = 'Edit';
  }

  deleteAuthor(author){
    console.log(author.id, author.name);
    this.service.deleteAuthors(author.id).subscribe((data) => {
      console.log(data)
    }, (error) => {this.msgText = error.message;}, () => {
      this.reloadData();
    });

  }

  onSubmit(data){
    console.log(data);
    if (this.option == 'Send'){
      this.service.postAuthors(data).subscribe((data) => {
      }, (error) => {this.msgText = error.message; console.log(error)}, () => {
        this.reloadData();
      });
    }

    if (this.option == 'Edit'){
      this.service.putAuthors(data.id, data).subscribe((data) => {},
        (error) => {this.msgText = error.message;},
        () => {this.reloadData()});
    }


    this.option = 'Send';
  }

  reloadData(){
    this.authors = [];
    this.service.getAuthors().subscribe((data) => {this.authors = data as Author[]}, (error) => {this.msgText = error.message;});
  }

}
