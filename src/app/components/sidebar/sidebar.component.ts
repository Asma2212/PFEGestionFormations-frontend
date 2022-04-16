import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Accueil',  icon: 'home', class: '' },
    { path: '/user-profile', title: 'Admin Profile',  icon:'manage_accounts', class: '' },
    { path: '/formation', title: 'Gestion Formations',  icon:'model_training', class: '' },
    { path: '/formateurs/list', title: 'Gestion Formateurs',  icon:'person', class: '' },
    { path: '/candidats/list', title: 'Gestion Candidats',  icon:'school', class: '' },
];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return false;
  };
}
