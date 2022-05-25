import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../../services/session.service";
import {LocalStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationService} from "primeng/api";
import {SessionFormationService} from "../../../../services/SessionFormation.service";
import {DatePipe} from "@angular/common";
import {UploadFileService} from "../../../../services/upload-file.service";
import {data} from "jquery";

@Component({
  selector: 'app-reviewing',
  templateUrl: './reviewing.component.html',
  styleUrls: ['./reviewing.component.scss']
})
export class ReviewingComponent implements OnInit {
score:number ;
username;
  idSession;
  constructor(private sessionService:SessionService,private localstorage:LocalStorageService
  , private route: ActivatedRoute, private toast: NgToastService, public dialog: MatDialog, private confirmationService: ConfirmationService, private sessionFormationService: SessionFormationService,public datepipe: DatePipe,private uploadService : UploadFileService) {
  }


  ngOnInit(): void {
    this.username=this.localstorage.retrieve("username");
    this.idSession = this.route.snapshot.params['id'];
    this.showGlobalRating();


  }
  addRating(){
console.log("there",this.score)
    this.sessionService.addrating(this.username,83,this.score.toString()).subscribe(
      data=>
      {
        console.log(data,"here$");

      },error => {
        console.log(error);
      }
    )
  }
  showGlobalRating(){
    this.sessionService.showGlobalRating(83).subscribe(
      data=>{
      this.score=data;}
      ,error => {console.log(error)}
    )
  }

}
