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
  months = ["Jan", "Fev", "Mar", "Avr", "May", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"];
  ListChat:ChatResponse[];
  ListSaving :ChatResponse[]=[];
  user1 : User
  fileInfos: Observable<any>;
  date1 : Date = new Date();
  formatDate : string = ""

  constructor(private http: HttpClient,public webSocketService: WebSocketService,private localStorage: LocalStorageService,private userService : UserService,private uploadService: UploadFileService) { }

  ngOnInit(): void {
    var chat=new ChatResponse();
    chat.dateEnvoi = new Date();
    this.webSocketService.getAllchat().subscribe(data=>
    {      this.ListChat=data
      this.ListChat.sort(function compare(a, b) {
        if (a.idChat < b.idChat)
           return -1;
        if (a.idChat > b.idChat )
           return 1;
        return 0;
      });
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
var chat=new ChatResponse();
console.log(data)
if(data.roles[0].id == 2)
chat.roleUser = "candidat"
if(data.roles[0].id == 1)
chat.roleUser = "formateur"
console.log("aaaa",chat.roleUser)
      var chatMessageDto = new ChatMessageDto(this.localStorage.retrieve("username"), sendForm.value.message,this.user1.firstName,this.user1.lastName,this.user1.photo,new Date(),chat.roleUser);
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
    })

  }
  testImage(t : string){
    return t.includes("image") ;
 }
 convertDateFormat(d) {
  const date = new Date(d);

  return String(date.getDate() + ' ' +this.months[date.getMonth()] + ' ' + date.getHours()+ ':' +date.getMinutes())
}
convertDateFormat1() {
  const date = new Date();

  return String(date.getDate() + ' ' +this.months[date.getMonth()] + ' ' + date.getHours()+ ':' +date.getMinutes())
}

}


