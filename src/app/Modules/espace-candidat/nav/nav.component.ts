import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
   items: ({ routerLink: string; icon: string; label: string } | { icon: string; label: string } | { icon: string; label: string } | { icon: string; label: string } | { icon: string; label: string })[];

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Ma liste', icon: 'pi pi-fw pi-home',routerLink:'/candidat/myList'},
      {label: 'Archivés', icon: 'pi pi-fw pi-file',routerLink:'/candidat/myArchives'},
      {label: 'Mes favoris', icon: 'pi pi-bookmark-fill',routerLink:'/candidat/MyFavorites'},
      {label: 'Ma calendrier', icon: 'pi pi-calendar',routerLink:'/candidat/calendar'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];




  }

}
