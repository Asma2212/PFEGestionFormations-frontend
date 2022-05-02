import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-formateur',
  templateUrl: './dashboard-formateur.component.html',
  styleUrls: ['./dashboard-formateur.component.scss']
})
export class DashboardFormateurComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("dasboard formateur")
  }

}
