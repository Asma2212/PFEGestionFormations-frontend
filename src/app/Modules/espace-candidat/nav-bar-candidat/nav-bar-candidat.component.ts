import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-candidat',
  templateUrl: './nav-bar-candidat.component.html',
  styleUrls: ['./nav-bar-candidat.component.scss']
})
export class NavBarCandidatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
  }

}
