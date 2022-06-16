import {Component, OnInit, Optional} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CandidatRegisterComponent} from "../../Authentification/login/candidat/candidat-register/candidat-register.component";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<CandidatRegisterComponent>,) { }

  ngOnInit(): void {
    this.dialogRef.close();
  }

}
