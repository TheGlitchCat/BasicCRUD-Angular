import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  @Input() msgText = null;

  constructor() { }

  ngOnInit() {
  }

}
