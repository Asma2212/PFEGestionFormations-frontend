import { Injectable } from '@angular/core';
import {ChatMessageDto} from "../models/ChatMessageDto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatResponse} from "../models/ChatResponse";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
 url="http://localhost:8080/chatting";
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor(private http: HttpClient,) { }

  public openWebSocket(){
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }
  public saveChatDB(chatList:ChatResponse[]):Observable<any>{
   return  this.http.post<any>(this.url+"/chatWS/save",chatList);
  }
public getAllchat ():Observable<ChatResponse[]>{
    return this.http.get<ChatResponse[]>(this.url+"/chatWS/allMessages");
}
  public closeWebSocket() {
    this.webSocket.close();
  }
}
