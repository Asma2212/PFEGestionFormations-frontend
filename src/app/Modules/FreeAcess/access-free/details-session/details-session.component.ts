import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Categorie} from "../../../../models/Categorie";
import {SessionService} from "../../../../services/session.service";
import {LocalStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationService} from "primeng/api";
import {SessionFormationService} from "../../../../services/SessionFormation.service";
import {DatePipe} from "@angular/common";
import {UploadFileService} from "../../../../services/upload-file.service";

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
  score: number;

  showText() {
    this.isReadMore = !this.isReadMore
  }

  showTexte() {
    this.isReadMoree = !this.isReadMoree
  }

  username;
  idSession;
  constructor(private sessionService:SessionService,private localstorage:LocalStorageService
    , private route: ActivatedRoute, private toast: NgToastService, public dialog: MatDialog, private confirmationService: ConfirmationService, private sessionFormationService: SessionFormationService,public datepipe: DatePipe,private uploadService : UploadFileService) {
  }


  ngOnInit(): void {
    this.username=this.localstorage.retrieve("username");
    this.idSession = this.route.snapshot.params['id'];

    this.PuTheRating();

  }
  addRating(){
    this.sessionService.addrating(this.username,this.idSession,this.score.toString()).subscribe(
      data=>
      {
        console.log(data,"here$");

      },error => {
        console.log(error);
      }
    )
  }


  showTextee() {
    this.isReadMoreee = !this.isReadMoreee
  }
showRating(){

  return (
    (this.dateFinSession < new Date()) || (this.localstorage.retrieve("role") != "candidat"));

}
  MyRating:number;
PuTheRating(){
    this.sessionService.PutMyDefaultRating(this.username,this.idSession).subscribe(data=>
      {
        
        this.score = data
        console.log("we tried", this.score)},
        error => {console.log(error)}
    )
}

  }
