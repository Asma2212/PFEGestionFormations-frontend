import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { Formation } from 'app/models/Formation';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { FormateursDialogComponent } from 'app/Modules/gestion-session-formation/formateurs-dialog/formateurs-dialog.component';
import { FormateurService } from 'app/services/formateur.service';
import { FormationService } from 'app/services/formation.service';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { UploadFileService } from 'app/services/upload-file.service';
import jsPDF from 'jspdf';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formation-avenir',
  templateUrl: './formation-avenir.component.html',
  styleUrls: ['./formation-avenir.component.scss']
})
export class FormationAvenirComponent implements OnInit {
  dateDeb : Date ;
  dateFin : Date;
    formSess : Formation[] = [];
    sessions: SessionFormation[];
    sessionsAll: SessionFormation[];
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
  
    constructor(private sessionService: SessionFormationService,private formateurService : FormateurService ,private confirmationService: ConfirmationService ,private formationService: FormationService ,private uploadService: UploadFileService) { }
  
    ngOnInit() {
  
      this.fileInfos = this.uploadService.getFiles();
      // this.sessionService.getSessions().subscribe(data => this.sessions = data);
     const idF =Number(localStorage.getItem("idF"))
  this.formateurService.getSessionByFormateur(idF).subscribe(data => {this.sessions = data
this.sessionsAll = data
  });
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
  
  /* exportExcel() {
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
    }*/
  
  

  
  
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

    showMore(session : SessionFormation){
      
    }
    historique(){
      this.sessions = this.sessionsAll.filter(s => new Date(s.dateFinSession) < new Date())
    }
    encours(){
      this.sessions = this.sessionsAll.filter(s => new Date(s.dateFinSession) >= new Date() &&  new Date(s.dateDebSession) <= new Date())
    }
    avenir(){
      this.sessions = this.sessionsAll.filter(s => new Date(s.dateDebSession) > new Date())
    }
  }