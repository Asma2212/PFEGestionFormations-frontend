import { Component, OnInit } from '@angular/core';
import {BlockableUI} from "primeng/api";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  isEditable: boolean;

  constructor() {
    this.isEditable=true ;
  }

  ngOnInit() {
  }



}
