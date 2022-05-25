import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Categorie} from "../../../../models/Categorie";

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
  styleUrls: ['./details-session.component.scss'],

})
export class DetailsSessionComponent implements OnInit {


  @Input() dateDebSession: Date;
  @Input() dateFinSession: Date;
  @Input() planning: Map<string,string>;
  @Input()descriptionSession:string
  @Input()categories:Categorie[]
  @Input()nbMawParticipant:number
  isReadMore = true
  isReadMoree = true
  isReadMoreee = true

  showText() {
    this.isReadMore = !this.isReadMore
  }

  showTexte() {
    this.isReadMoree = !this.isReadMoree
  }

  constructor() {
  }

  ngOnInit(): void {

  }

  showTextee() {
    this.isReadMoreee = !this.isReadMoreee
  }
}
