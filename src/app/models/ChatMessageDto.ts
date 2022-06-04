export class ChatMessageDto {
  user: string;
  message: string;
  photo : string;
  firstName : String ;
  lastName : string ;

  constructor(user: string, message: string,
    firstName : String ,
    lastName : string ,
    photo : string){
    this.user = user;
    this.message = message;
      this.firstName = firstName ;
      this.lastName = lastName ;
      this.photo = photo ;
  }
}
