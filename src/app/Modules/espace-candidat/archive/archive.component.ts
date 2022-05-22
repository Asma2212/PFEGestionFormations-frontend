import { Component, OnInit } from '@angular/core';
import {UploadFileService} from "../../../services/upload-file.service";
import {SessionService} from "../../../services/session.service";
import {LocalStorageService} from "ngx-webstorage";
import {SessionFormation} from "../../../models/SessionFormation";
import {Observable} from "rxjs";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
   sessions: SessionFormation[]=[];
  fileInfos: Observable<any>;
  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any = null;
  selectedFile: FileList;
  currentFile: File;

  constructor(private uploadService: UploadFileService,private sessionService: SessionService, public localstorage:LocalStorageService) { }


  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

    this.sessionService.ListInscription(this.localstorage.retrieve("username")).toPromise().then(data => {
      if (data.length==0){return}
      else
        data.forEach( obj =>
        {


          if ((new Date(obj.dateFinSession))<new Date()){

            this.sessions.push(obj)
          }

        })
console.log("s",this.sessions)
      }
    );
  }

  testImage(t : string){
    return t.includes("image") ;
  }
}
