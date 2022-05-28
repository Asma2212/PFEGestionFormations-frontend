import { Component, OnInit } from '@angular/core';
import {SuggestionService} from "../../../services/suggestion.service";
import {CandidatService} from "../../../services/candidat.service";

@Component({
  selector: 'app-gestion-suggestion',
  templateUrl: './gestion-suggestion.component.html',
  styleUrls: ['./gestion-suggestion.component.scss']
})
export class GestionSuggestionComponent implements OnInit {

suggestions: any[];

  selectedCustomers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  private AllCandidats: any;

  constructor(private suggestionService:SuggestionService,private  candidatService:CandidatService) { }

  ngOnInit() {
    this.candidatService. getAllCandidats().subscribe(data1=>

    {
      this.AllCandidats=data1;    })
    this.suggestionService.AllSuggestions().subscribe(data=>{
   this.suggestions=data;
    })
/*
    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(customer => customer.date = new Date(customer.date));
    });
*/


    this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'},
      {label: 'New', value: 'new'},
      {label: 'Negotiation', value: 'negotiation'},
      {label: 'Renewal', value: 'renewal'},
      {label: 'Proposal', value: 'proposal'}
    ]
  }
}
