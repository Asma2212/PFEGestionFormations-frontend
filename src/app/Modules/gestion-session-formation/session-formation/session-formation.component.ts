import { Component, Input, OnInit, Inject } from '@angular/core';
import { NivDifficulteEnum } from 'app/models/NivDifficulteEnum';
import { SessionFormation } from 'app/models/SessionFormation';
import { SessionFormationService } from 'app/services/SessionFormation.service';
import { SelectItem } from 'primeng/api';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-session-formation',
  templateUrl: './session-formation.component.html',
  styleUrls: ['./session-formation.component.scss']
})
export class SessionFormationComponent implements OnInit {

  sessions: SessionFormation[];
  session : SessionFormation ;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;
  cols: any[];

  exportColumns: any[];

  constructor(private sessionService: SessionFormationService) { }

  ngOnInit() {
     // this.sessionService.getSessions().toPromise().then(data => this.sessions = data);
this.sessions=[{
  idSession : 1,
    titreSession : "Full Stack Angular Spring Boot" ,
    descriptionSession : "formation certifiée",
    dateDebSession : new Date(2022, 10, 15) ,
    dateFinSession :new Date(2022, 10, 20),
    photoSession : "angular.png" ,
    planning : "" ,
    nivDifficulte : NivDifficulteEnum.avance,
    nbMaxCandidat : 15 ,
    listeFormateur : null,
    listeCandidat : null
},
{
  idSession : 2,
    titreSession : "titre2" ,
    descriptionSession : "desc2",
    dateDebSession : new Date(2023, 10, 15) ,
    dateFinSession :new Date(2023, 10, 20),
    photoSession : "" ,
    planning : "" ,
    nivDifficulte : NivDifficulteEnum.facile,
    nbMaxCandidat : 15 ,
    listeFormateur : null,
    listeCandidat : null
},{
  idSession : 2,
    titreSession : "titre2" ,
    descriptionSession : "desc2",
    dateDebSession : new Date(2023, 10, 15) ,
    dateFinSession :new Date(2023, 10, 20),
    photoSession : "" ,
    planning : "" ,
    nivDifficulte : NivDifficulteEnum.facile,
    nbMaxCandidat : 15 ,
    listeFormateur : null,
    listeCandidat : null
},{
  idSession : 2,
    titreSession : "titre2" ,
    descriptionSession : "desc2",
    dateDebSession : new Date(2023, 10, 15) ,
    dateFinSession :new Date(2023, 10, 20),
    photoSession : "" ,
    planning : "" ,
    nivDifficulte : NivDifficulteEnum.facile,
    nbMaxCandidat : 15 ,
    listeFormateur : null,
    listeCandidat : null
}]

this.cols = [
  { field: 'idSession', header: 'Code', customExportHeader: 'Session Code' },
  { field: 'titreSession', header: 'titreSession' },
  { field: 'dateDebSession', header: 'dateDebSession' },
  { field: 'dateFinSession', header: 'dateFinSession' }

];

this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.sortOptions = [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'}
      ];
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
    console.log(sessionDiff)
    if (sessionDiff === 'facile') {
    return '#C8E6C9';
    } else 
    if(sessionDiff === 'moyenne')
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
}


