import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatResponse} from "../../../models/ChatResponse";
import {HttpClient} from "@angular/common/http";
import {WebSocketService} from "../../../services/web-socket.service";
import {LocalStorageService} from "ngx-webstorage";
import {NgForm} from "@angular/forms";
import {ChatMessageDto} from "../../../models/ChatMessageDto";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit,OnDestroy {

  ListChat:ChatResponse[];
  ListSaving :ChatResponse[]=[];

  constructor(private http: HttpClient,public webSocketService: WebSocketService,private localStorage: LocalStorageService,) { }

  ngOnInit(): void {
    this.webSocketService.getAllchat().subscribe(data=>
    {      this.ListChat=data
      console.log("chat",this.ListChat);


    })
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    // this.webSocketService.saveChatDB(this.ListSaving).subscribe()
    this.webSocketService.closeWebSocket();
  }
  sendMessage(sendForm: NgForm) {
    var chatMessageDto = new ChatMessageDto(this.localStorage.retrieve("username"), sendForm.value.message);
    var chat=new ChatResponse();
    chat.userChat=this.localStorage.retrieve("username")
    this.webSocketService.sendMessage(chatMessageDto);

    chat.messageChat= sendForm.value.message;
    this.ListSaving.push(chat);


    this.webSocketService.saveChatDB(this.ListSaving).subscribe()
    this.ListSaving=[]

    sendForm.controls.message.reset();

  }


}


