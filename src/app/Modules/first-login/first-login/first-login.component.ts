import { Component, OnInit } from '@angular/core';
import { Formateur } from 'app/models/Formateur';
import { FormateurService } from 'app/services/formateur.service';
import { TicketService } from 'app/services/Ticket.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  items: MenuItem[];
    
  subscription: Subscription;
  formateur : Formateur ;

  constructor(public messageService: MessageService, public formateurService : FormateurService) {}

  ngOnInit() {
      this.items = [{
              label: 'profil',
              routerLink: 'profil'
          },
          {
              label: 'photo',
              routerLink: 'photo'
          },
          {
              label: 'securite',
              routerLink: 'securite'
          },
          {
              label: 'Confirmation',
              routerLink: 'confirmation'
          }
      ];

      this.subscription = this.formateurService.saveFormateur(this.formateur).subscribe((personalInformation) =>{
          this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
      });
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}

