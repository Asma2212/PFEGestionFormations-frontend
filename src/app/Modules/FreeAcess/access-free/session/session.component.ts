import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  checked1: boolean = false;

  checked2: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
}
