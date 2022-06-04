import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatResponse} from "../../../models/ChatResponse";
import {HttpClient} from "@angular/common/http";
import {WebSocketService} from "../../../services/web-socket.service";
import {LocalStorageService} from "ngx-webstorage";
import {NgForm} from "@angular/forms";
import {ChatMessageDto} from "../../../models/ChatMessageDto";
import { UserService } from 'app/services/user.service';
import { User } from 'app/models/User';
import { Observable } from 'rxjs';
import { UploadFileService } from 'app/services/upload-file.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit,OnDestroy {

  ListChat:ChatResponse[];
  ListSaving :ChatResponse[]=[];
  user1 : User
  fileInfos: Observable<any>;

  constructor(private http: HttpClient,public webSocketService: WebSocketService,private localStorage: LocalStorageService,private userService : UserService,private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.webSocketService.getAllchat().subscribe(data=>
    {      this.ListChat=data
      console.log("chat",this.ListChat);
      this.fileInfos = this.uploadService.getFiles();


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
      var chatMessageDto = new ChatMessageDto(this.localStorage.retrieve("username"), sendForm.value.message,this.user1.firstName,this.user1.lastName,this.user1.photo);
      var chat=new ChatResponse();
      chat.userChat=this.localStorage.retrieve("username")
      this.webSocketService.sendMessage(chatMessageDto);
  
      chat.messageChat= sendForm.value.message;
      this.ListSaving.push(chat);
  
  
      this.webSocketService.saveChatDB(this.ListSaving).subscribe()
      this.ListSaving=[]
  
      sendForm.controls.message.reset();
    })

  }
  testImage(t : string){
    return t.includes("image") ;
 }

}


