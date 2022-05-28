import { Component, OnInit,OnDestroy } from '@angular/core';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { NgForm } from '@angular/forms';
import {WebSocketService} from "../../../services/web-socket.service";
import {ChatMessageDto} from "../../../models/ChatMessageDto";
import {LocalStorageService} from "ngx-webstorage";
import {HttpClient} from "@angular/common/http";
import {chat} from "googleapis/build/src/apis/chat";
import {data} from "jquery";
import {ChatResponse} from "../../../models/ChatResponse";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {
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
