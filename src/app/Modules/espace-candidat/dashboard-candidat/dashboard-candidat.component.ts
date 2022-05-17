import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-candidat',
  templateUrl: './dashboard-candidat.component.html',
  styleUrls: ['./dashboard-candidat.component.scss']
})
export class DashboardCandidatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const counter = document.querySelector(".counter");
    let count = 0;
    setInterval(() => {
      if(count == 92) {
        clearInterval(count);
      }else {
        count+=1;
        counter.textContent = count + "%";
      }
    }, 42);
  }

}
