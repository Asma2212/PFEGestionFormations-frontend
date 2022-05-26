import { Component, OnInit } from '@angular/core';
import { Classe } from 'app/models/Classe';
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
    class : any[]= [] ;
    classSpec : any[] = [] ;
    depC : Classe[] ;
    classNiv : any[] = [] ;


    constructor(private messageService: MessageService,private departementService : DepartementService) {}

    ngOnInit() {
this.departementService.getAllDepartements().subscribe(data => {
    this.departements = data 
    console.log(this.departements)
this.departements.forEach(dep => {
    this.classNiv  = [] ;
    if (dep.name.toLowerCase().includes("informatique")) {
       this.depC =  dep.classes.filter(c => 
            c.name.includes("L2") )
            this.depC.forEach(c => {
                this.class.push({
                    label: c.name,
                    styleClass: 'person'
                })
                console.log("L2 : ",this.class)
            })
                this.classNiv.push(
                    {
                        label: 'L2',
                       // type: 'person',
                        styleClass: 'department-cfo',
                        expanded: true,
                       // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                        children:this.class 
                        
                    });
                    console.log("L2 niv : ",this.classNiv)
                    this.class = [];
        this.depC =  dep.classes.filter(c => 
                        c.name.includes("L3") )
                        this.depC.forEach(c => {
                            this.class.push({
                                label: c.name,
                               // styleClass: 'department-cfo'
                            })})
                            this.classNiv.push(
                                {
                                    label: 'L3',
                                   // type: 'person',
                                    styleClass: 'department-cfo',
                                    expanded: true,
                                   // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                                    children:this.class 
                                    
                                });
                                this.class = [];
        this.depC =  dep.classes.filter(c => 
                                    c.name.includes("L1") )
                                    this.depC.forEach(c => {
                                        this.class.push({
                                            label: c.name,
                                            //styleClass: 'department-cfo'
                                        })})
                                        this.classNiv.push(
                                            {
                                                label: 'L1',
                                               // type: 'person',
                                                styleClass: 'department-cfo',
                                                expanded: true,
                                               // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                                                children:this.class 
                                                
                                            });
                                            this.class = [];

        this.child1.push(
            {
                label: dep.name,
                styleClass: 'department-cfo',
                expanded: true,
               // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                children: this.classNiv
            }
        )
    
    }
    if (dep.name.toLowerCase().includes("electrique")) {
        this.depC =  dep.classes.filter(c => 
             c.name.includes("L2") )
             this.depC.forEach(c => {
                 this.class.push({
                     label: c.name,
                     styleClass: 'person'
                 })
                 console.log("L2 : ",this.class)
             })
                 this.classNiv.push(
                     {
                         label: 'L2',
                        // type: 'person',
                         styleClass: 'department-cfo',
                         expanded: true,
                        // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                         children:this.class 
                         
                     });
                     console.log("L2 niv : ",this.classNiv)
                     this.class = [];
         this.depC =  dep.classes.filter(c => 
                         c.name.includes("L3") )
                         this.depC.forEach(c => {
                             this.class.push({
                                 label: c.name,
                                // styleClass: 'department-cfo'
                             })})
                             this.classNiv.push(
                                 {
                                     label: 'L3',
                                    // type: 'person',
                                     styleClass: 'department-cfo',
                                     expanded: true,
                                    // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                                     children:this.class 
                                     
                                 });
                                 this.class = [];
         this.depC =  dep.classes.filter(c => 
                                     c.name.includes("L1") )
                                     this.depC.forEach(c => {
                                         this.class.push({
                                             label: c.name,
                                             //styleClass: 'department-cfo'
                                         })})
                                         this.classNiv.push(
                                             {
                                                 label: 'L1',
                                                // type: 'person',
                                                 styleClass: 'department-cfo',
                                                 expanded: true,
                                                // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                                                 children:this.class 
                                                 
                                             });
                                             this.class = [];
 
         this.child1.push(
             {
                 label: dep.name,
                 styleClass: 'department-cfo',
                 expanded: true,
                // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                 children: this.classNiv
             }
         )
     
     }


});
this.data1 = [{
    label: '  ISET Rades',
    type: 'person',
    styleClass: 'p-person',
    expanded: true,
    data: {name:'', 'avatar': 'iset1.jpg'},
    children : this.child1
}];
    });
console.log("eeee",this.child1)



    }

    onNodeSelect(event) {
        this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
    }
}