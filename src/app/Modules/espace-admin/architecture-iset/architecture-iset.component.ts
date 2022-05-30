import { Component, OnInit } from '@angular/core';
import { Classe } from 'app/models/Classe';
import { Department } from 'app/models/Departement';
import { DepartementService } from 'app/services/departement.service';
import { Children } from 'preact/compat';
import { MessageService, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GestionClasseComponent } from '../gestion-classe/gestion-classe.component';
import { GestionDepartementComponent } from '../gestion-departement/gestion-departement.component';

@Component({
  selector: 'app-architecture-iset',
  templateUrl: './architecture-iset.component.html',
  styleUrls: ['./architecture-iset.component.scss'],
  providers: [DialogService]
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
    ref: DynamicDialogRef;
    nomDep : string ;


    constructor(private messageService: MessageService,private departementService : DepartementService,private dialogService : DialogService) {}

    ngOnInit() {
this.departementService.getAllDepartements().subscribe(data => {
    this.departements = data 
    console.log(this.departements)
this.departements.forEach(dep => {
    this.classNiv  = [] ;
    this.nomDep = dep.name
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
                                                c.name.includes("M1") )
                                                this.depC.forEach(c => {
                                                    this.class.push({
                                                        label: c.name,
                                                        //styleClass: 'department-cfo'
                                                    })})
                                                    this.classNiv.push(
                                                        {
                                                            label: 'M1',
                                                           // type: 'person',
                                                            styleClass: 'department-cfo',
                                                            expanded: true,
                                                           // data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                                                            children:this.class 
                                                            
                                                        });
                                                        this.class = [];
                                                        this.depC =  dep.classes.filter(c => 
                                                            c.name.includes("M2") )
                                                            this.depC.forEach(c => {
                                                                this.class.push({
                                                                    label: c.name,
                                                                    //styleClass: 'department-cfo'
                                                                })})
                                                                this.classNiv.push(
                                                                    {
                                                                        label: 'M2',
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
        this.messageService.add({severity: 'success', summary: 'Selectionnée', detail: event.node.label});
    }

    gestionDepartement(){
        this.ref = this.dialogService.open(GestionDepartementComponent, {
            header: 'liste des Departements',
            width: '50%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000
          }); 
          }
          ngOnDestroy() {
          if (this.ref) {
              this.ref.close();
          }
          
          }
    gestionClasse(){
        this.ref = this.dialogService.open(GestionClasseComponent, {
            header: 'liste des classes',
            width: '50%',
            contentStyle: {"max-height": "500px", "overflow": "auto"},
            baseZIndex: 10000
          }); 
          }
}