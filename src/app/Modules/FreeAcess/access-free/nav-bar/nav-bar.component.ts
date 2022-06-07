import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {ConfirmationService} from "primeng/api";
import {AuthService} from "../../../../services/auth.service";
import {User} from "../../../../models/User";
import {Observable} from "rxjs";
import {UploadFileService} from "../../../../services/upload-file.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  items: any;
  display: boolean = false;
  mod:boolean = true;
  public TheCurrentUser: User;
   fileInfos: Observable<any>;
  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any = null;
  currentFile: File;

  constructor( private uploadService: UploadFileService,private authService :AuthService,public localStorage1: LocalStorageService,private confirmationService: ConfirmationService,private router: Router) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

    this.slideMenu()
    this.currentUserData()}



  slideMenu(){
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];

  }


  confirm() {
    console.log("I entered")
    this.confirmationService.confirm({
      acceptLabel:"Oui",
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"Non",
      rejectButtonStyleClass:"p-button-info",
      message: 'Êtes-vous sûr vous voulez quitter?',
      header: 'Deconnexion',
      accept: () => {
        this.localStorage1.clear("authenticationToken")
        this.localStorage1.clear("username")
        this.localStorage1.clear("role")
        if(localStorage.getItem("idF"))
        localStorage.removeItem("idF")
        this.router.navigate(['/home']);
      }
    });}
  showDialog() {
    this.display = true;
  }
  currentUserData(){
    this.authService.currentUserDetail().subscribe(data=> {
      this.TheCurrentUser=data ;

    })
  }
  testImage(t : string){
    return t.includes("image") ;
  }

  goToProfil(){
    if(this.localStorage1.retrieve('role')=='formateur'){
      this.router.navigate(['/formateur/profil']);
    }

    if(this.localStorage1.retrieve('role')=='candidat'){
      this.router.navigate(['/candidat/profil']);
    }
    if(this.localStorage1.retrieve('role')=='admin'){
      this.router.navigate(['/user-profile']);
    }
    else {return}
  }
  goHome(){
    this.router.navigate(['/home']);
  }
/*  retrieveelement():boolean{

/!*
    return(localStorage.length===0);
*!/
  }*/
}
