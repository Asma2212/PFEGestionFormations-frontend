import { Component, OnInit } from '@angular/core';
import {BlockableUI} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../models/User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
/*
  isEditable: boolean;
*/
  geeks: boolean;
  profilForm:  FormGroup;
   TheCurrentUser: User;

  constructor(private authService: AuthService) {
    /*   this.isEditable=true ;
     */

  }

  ngOnInit() {
    this.detailsUserAdmin()




  }




  gfg() {
    this.geeks = true;
  }
  detailsUserAdmin(){
    this.authService.currentUserDetail().subscribe(data=>{
      this.TheCurrentUser=data ;
      console.log(data);

    })
  }
}
