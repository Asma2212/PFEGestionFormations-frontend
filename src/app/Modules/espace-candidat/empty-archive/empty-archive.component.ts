import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-empty-archive',
  templateUrl: './empty-archive.component.html',
  styleUrls: ['./empty-archive.component.scss']
})
export class EmptyArchiveComponent implements OnInit {

  constructor(private router: Router)  { }

  ngOnInit(): void {

  }

  routing() {
    this.router.navigate(['/home/formation']);


  }
}
