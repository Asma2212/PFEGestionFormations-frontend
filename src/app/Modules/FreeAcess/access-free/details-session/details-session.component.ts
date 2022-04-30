import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
  styleUrls: ['./details-session.component.scss']
})
export class DetailsSessionComponent implements OnInit {
  isReadMore = true
  isReadMoree = true

  showText() {
    this.isReadMore = !this.isReadMore}
  showTexte() {
    this.isReadMoree = !this.isReadMoree}
  constructor() { }

  ngOnInit(): void {
  }

}
