import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import {SessionService} from "../../../../services/session.service";
import {Subscription} from "rxjs/Subscription";
import {sessionResponsePayload} from "../../../payload/session/session-response-payload";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  checked1: boolean = false;

  checked2: boolean = true;
  val: number;
  private errors: any;
   session: sessionResponsePayload;
  private id: number;

  constructor(private sessionService: SessionService,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']
    console.log(this.id)
    this.val = 3;
    this.getbyIDSession(this.id)


  }
  getbyIDSession(id:number){
    this.sessionService.getSession(id).toPromise().then(data => {
      this.session=data
      console.log(this.session)

    }, error => {this.errors=error.error.message;})

  }

}
