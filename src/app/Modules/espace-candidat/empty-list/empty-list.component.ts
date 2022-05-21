import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routing() {
    this.router.navigate(['/home/formation']);

  }
}
