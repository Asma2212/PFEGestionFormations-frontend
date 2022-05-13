import { Component, Input, OnInit, Inject, OnDestroy } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import jsPDF from "jspdf";
import "jspdf-autotable";
//import "jspdf-autotable";
import * as FileSaver from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormateursDialogComponent } from '../formateurs-dialog/formateurs-dialog.component';
import { Formateur } from 'app/models/Formateur';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from 'app/services/upload-file.service';
import { Observable } from 'rxjs';
import { FormationService } from 'app/services/formation.service';
import { Formation } from 'app/models/Formation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Session } from 'protractor';


@Component({
  selector: 'app-session-formation',
  templateUrl: './session-formation.component.html',
  styleUrls: ['./session-formation.component.scss'],
  providers: [DialogService],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))

    ])
]
})
export class SessionFormationComponent implements OnInit,OnDestroy {
dateDeb : Date ;
dateFin : Date;
  formSess : Formation[] = [];
  sessions: SessionFormation[];
  session : SessionFormation ;
  selectedFormateurs : Formateur[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  names : string[] = [];
  namesStr : string = "";
  cols: any[];

  exportColumns: any[];
  ref: DynamicDialogRef;
  submitted: boolean;
  sessionDialog:boolean ;
  nivDifficulte : NivDifficulteEnum[] = [NivDifficulteEnum.facile,NivDifficulteEnum.moyen,NivDifficulteEnum.avance];

  uploadedFiles: any[] = [];
  file: File = null;
  fileCV: File = null;
  public imagePath;
  imgURL: any = null;
  selectedFile: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  listeFormations : Formation[];

  minDate : Date ;
  maxDate : Date ;
  minDate1 : Date ;
  maxDate1 : Date ;
  more : boolean = false ;

  constructor(private sessionService: SessionFormationService,private confirmationService: ConfirmationService ,private formationService: FormationService ,private uploadService: UploadFileService, private dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit() {

    this.formationService.getAllFormations().toPromise().then( data => {
      this.listeFormations = data ;
        console.log("everthing is okay geet",data)
      });

    this.fileInfos = this.uploadService.getFiles();
     this.sessionService.getSessions().toPromise().then(data => this.sessions = data);

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



  suivantSession() {
    console.log("aaa")
    this.ref = this.dialogService.open(FormateursDialogComponent, {
      header: 'Choose formateurs',
      data : this.selectedFormateurs,
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
//update selectedFormateurs = listFormateurs
    this.ref.onClose.subscribe((formateurs: Formateur[]) =>{
      this.names=[];
      this.namesStr=""
      this.selectedFormateurs = formateurs
        if (formateurs[0]) {
          formateurs.forEach( formateur=> {
            //this.session.listeFormateur.push(formateur)
            this.names.push(formateur.firstName);
            this.namesStr = this.namesStr+"- "+formateur.firstName+"\n";

          });

            this.messageService.add({severity:'info', summary: 'formateur Selected', detail: this.namesStr});
        }
    });

  }

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
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

    exportPdf() {
      console.log()
      const doc = new jsPDF('p','pt');
    doc['autoTable'](this.exportColumns, this.sessions);
    doc.save("sessions.pdf");
  }

  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.sessions);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "sessions");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  openNew() {
    this.sessionDialog = true;
    this.session = {  idSession:  0,
      titreSession : "",
      descriptionSession : "",
      lieuSession : "",
    dateDebSession : null ,
    dateFinSession : null ,
    photoSession : "",
    planning : null,
    programme : "",
    nivDifficulte : null ,
    nbMaxCandidat : 0 ,
    formationSession:null,
    listeFormateurs : [] ,
    listeCandidat : []
    };
    this.submitted = false;
}

hideDialog() {
  this.sessionDialog = false;
  this.submitted = false;
 this.imgURL = null ;
  this.uploadedFiles = [];
  this.file  = null;
  this.selectedFile = null;
  this.currentFile=null;
  this.progress = 0;
  this.message= '';
  this.formSess = [];
  this.selectedFormateurs = [] ;
  this.dateDeb = null ;
  this.dateFin = null ;
}
saveSession(){
  this.submitted = true ;
  if(this.session.nbMaxCandidat<30){
  this.session.formationSession = this.formSess[0];
  console.log("session bch tetbaath :",this.session)
  if(this.file){
    this.session.photoSession=this.file.name ;
  }
  this.session.dateDebSession = this.dateDeb
  this.session.dateFinSession = this.dateFin ;
  if(this.selectedFormateurs)
  {
    this.session.listeFormateurs = [] ;
    this.selectedFormateurs.forEach( formateur=> {
      this.session.listeFormateurs.push(formateur)
    });
  }
    if (this.session.idSession) {
      console.log("before update",this.session);
      this.sessionService.updateSession(this.session).subscribe( data => {
        console.log("data update session",data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'session Updated', life: 3000});
      window.location.reload();
      });

  }
  else {

      this.sessionService.saveSession(this.session).subscribe( data => {
        console.log("data save session",data);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'session ajouter', life: 3000});
        window.location.reload();
      },
      error =>
     {
      this.messageService.add( {severity:'error', summary:'Error', detail: error.error.message, life: 3000});
      this.session.photoSession = null ;
    console.log("exception occured");});
  }}
  }

  deleteSession(session : SessionFormation) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ?',//' + formateur.name + 'Are you sure you want to delete' + formateur.name + ' ?'
        header: 'Confirm',
        icon: 'pi pi-exclamateur-triangle',
        accept: () => {
           // this.formateurs = this.formateurs.filter(val => val.id !== formateur.id);
            console.log(session.idSession);
            this.sessionService.deleteSession(session.idSession).subscribe( data => {
              console.log("data Session Supprimer",data)
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'session Supprimer', life: 3000});
              window.location.reload();
            });
            this.session = null;

        }
    });

}

editSession(session: SessionFormation) {
  this.dateDeb = new Date(session.dateDebSession)
  this.dateFin = new Date(session.dateFinSession)
  console.log("sesss",session);
  if (session.listeFormateurs[0]) {
    session.listeFormateurs.forEach( formateur=> {
      //this.session.listeFormateur.push(formateur)
      this.names.push(formateur.firstName);
    });}
    this.formSess.push(session.formationSession);
  this.selectedFormateurs=session.listeFormateurs ;
  this.session = {...session};
  //this.imgURL = session.photo ;
  this.sessionDialog = true;

}

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFile.item(0);
    console.log("current file",this.currentFile);

    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        console.log(err);
        if(err.error.message.includes("constraint"))
        this.message =" Cette image existe deja"
        else
        this.message = ' Un probleme est survenue';
        this.currentFile = undefined;
      });
    this.selectedFile = undefined;
  }

  onUpload(event){
    this.selectedFile = event.target.files;
    this.file = <File>event.target.files[0]
    console.log(this.file)
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();

    this.imagePath = this.file;
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log("imaage",this.imgURL)
    }
  }
  testImage(t : string){
    return t.includes("image") ;
 }


  changeDate() {
    console.log("chaging date")
    if(this.dateDeb > this.dateFin)
    this.dateFin = null ;
  }
}



