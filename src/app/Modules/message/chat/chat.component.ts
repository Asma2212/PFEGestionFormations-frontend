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
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/User';
import { UploadFileService } from 'app/services/upload-file.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {
ListChat:ChatResponse[];
ListSaving :ChatResponse[]=[];
user1 : User
fileInfos: Observable<any>;

  constructor(private http: HttpClient,public webSocketService: WebSocketService,private localStorage: LocalStorageService,private userService : UserService,private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
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
    this.userService.getUser(this.localStorage.retrieve("username")).subscribe(data =>{ 
      this.user1 =data
      var chatMessageDto = new ChatMessageDto(this.localStorage.retrieve("username"), sendForm.value.message,this.user1.firstName,this.user1.lastName,this.user1.photo,new Date(),this.user1.role.toString());
    var chat=new ChatResponse();
    chat.userChat=this.localStorage.retrieve("username")
    this.webSocketService.sendMessage(chatMessageDto);

    chat.messageChat= sendForm.value.message;
    chat.firstNameUser = this.user1.firstName
    chat.lastNameUser = this.user1.lastName
    chat.photoUser = this.user1.photo
    chat.dateEnvoi = new Date();
    this.ListSaving.push(chat);


    this.webSocketService.saveChatDB(this.ListSaving).subscribe()
    this.ListSaving=[]

    sendForm.controls.message.reset();

  })}


}
