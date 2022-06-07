export class ChatMessageDto {
  user: string;
  message: string;
  photo : string;
  firstName : String ;
  lastName : string ;
  dateEnvoi : Date ;
  role : string ;

  constructor(user: string, message: string,
    firstName : String ,
    lastName : string ,
    photo : string,  dateEvoi : Date ,
    role : string ){
    this.user = user;
    this.message = message;
      this.firstName = firstName ;
      this.lastName = lastName ;
      this.photo = photo ;
      this.dateEnvoi = dateEvoi;
      this.role = role
  }
}
