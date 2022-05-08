import { Component, OnInit } from '@angular/core';
import { Department } from 'app/models/Departement';
import { DepartementService } from 'app/services/departement.service';
import { Children } from 'preact/compat';
import { MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-architecture-iset',
  templateUrl: './architecture-iset.component.html',
  styleUrls: ['./architecture-iset.component.scss']
})
export class ArchitectureIsetComponent implements OnInit {

  data1: TreeNode[];

    selectedNode: TreeNode;
    departements : Department[] = [];
    chidren : any[] = [];
    child1 : any [] = [];
    class : any[] = [] ;
    classSpec : any[] = [] ;
    classNiv : any[] = [] ;

    constructor(private messageService: MessageService,private departementService : DepartementService) {}

    ngOnInit() {
this.departementService.getAllDepartements().toPromise().then(data => {
    this.departements = data 
this.departements.forEach(dep => {
    if (dep.name.toLowerCase().includes("electrique")) {
        dep.classes.forEach(c => {
            this.class.push({
                label: c.name,
                styleClass: 'department-cfo'
            }) 
            if(c.name.toLowerCase().includes("l1")){
                this.classNiv.push(
                    {
                        label: 'L1',
                       // type: 'person',
                        styleClass: 'department-cfo',
                        expanded: true,
                       // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                        children:this.class 
                        
                    });
            }else
            if(c.name.toLowerCase().includes("l2")){
                this.classNiv.push(
                    {
                        label: 'L2',
                       // type: 'person',
                        styleClass: 'department-cfo',
                        expanded: true,
                       // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                        children:this.class 
                        
                    });
            }else
            if(c.name.toLowerCase().includes("l3")){
                this.classNiv.push(
                    {
                        label: 'L3',
                       // type: 'person',
                        styleClass: 'department-cfo',
                        expanded: true,
                       // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                        children:this.class 
                        
                    });
            }
        if(c.name.toLowerCase().includes("dsi")){
            this.classSpec.push(
                {
                    label: 'DSI',
                   // type: 'person',
                    styleClass: 'department-cfo',
                    expanded: true,
                   // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                    children:this.classNiv
                    
                });
            

        }
        if(c.name.toLowerCase().includes("sem")){
            this.classSpec.push(
                {
                    label: 'Systeme embarqué',
                   // type: 'person',
                    styleClass: 'department-cfo',
                    expanded: true,
                   // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                    children:this.classNiv
                    
                });
            

        }
        if(c.name.toLowerCase().includes("rsi")){
            this.classSpec.push(
                {
                    label: 'Reseau SI',
                   // type: 'person',
                    styleClass: 'department-cfo',
                    expanded: true,
                   // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                    children:this.class 
                    
                });
            

        }
        });
        this.child1.push(
            {
                label: dep.name,
                styleClass: 'department-cfo',
                expanded: true,
               // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                children: this.classSpec
            }
        )
        
    }
    this.data1 = [{
        label: '  ISET Rades',
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        data: {name:'', 'avatar': 'iset1.jpg'},
        children : this.child1
    }];


});
    });
console.log("eeee",this.child1)



    }

    onNodeSelect(event) {
        this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node});
    }
}