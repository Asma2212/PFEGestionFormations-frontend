import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SessionFormation} from "../../../models/SessionFormation";
import {SessionService} from "../../../services/session.service";
import {LocalStorageService} from "ngx-webstorage";
import {SelectItem} from "primeng/api";
import {Observable} from "rxjs";
import {UploadFileService} from "../../../services/upload-file.service";

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss'],
})
export class ListInscriptionComponent implements OnInit {

 sessions: SessionFormation[];

  sortOptions: SelectItem[];

  sortOrder: number;
  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any = null;
  selectedFile: FileList;
  currentFile: File;
  sortField: string;
  cols: any[];
  minDate : Date ;
  exportColumns: any[];
  private fileInfos: Observable<any>;
  sortKey: any;

  constructor(private uploadService: UploadFileService,private sessionService: SessionService, public localstorage:LocalStorageService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();

    this.sessionService.ListInscription(this.localstorage.retrieve("username")).toPromise().then(data => {

        this.sessions = data
      console.log("all the inscription sessions of the condidat",this.sessions)
    }
    );
    this.cols = [
      { field: 'idSession', header: 'Code', customExportHeader: 'Session Code' },
      { field: 'titreSession', header: 'titreSession' },
      { field: 'dateDebSession', header: 'dateDebSession' },
      { field: 'dateFinSession', header: 'dateFinSession' }

    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.sortOptions = [
      {label: 'Nombre Haut - Bas', value: '!nbMaxCandidat'},
      {label: 'Nombre Bas - Haut', value: 'nbMaxCandidat'}
    ];

    this.minDate = new Date()
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  getColor(sessionDiff) {
    if (sessionDiff === 'FACILE') {
      return '#C8E6C9';
    } else
    if(sessionDiff === 'MOYEN')
      return '#FEEDAF';

    else{
      return '#FFCDD2';
    }
  }
  testImage(t : string){
    return t.includes("image") ;
  }

}
