import { Component, OnInit } from '@angular/core';
import { AutoecoleService } from '../../../services/autoecole.service'; // Service pour les auto-écoles
import { Autoecole } from '../../../modules/autoecoles'; 

@Component({
  selector: 'app-list-autoecoles',
  standalone:false,
  templateUrl: './list-autoecoles.component.html', 
  styleUrls: ['./list-autoecoles.component.css'] 
})
export class ListAutoecolesComponent implements OnInit {
  autoecoles: any[] = []; // Liste des auto-écoles

  constructor(private autoecoleService: AutoecoleService) {} // Injection du service

  ngOnInit(): void {
    this.loadAutoecoles(); // Charger les auto-écoles au démarrage
  }

  // Charger la liste des auto-écoles
  loadAutoecoles(): void {
    this.autoecoleService.getAutoecoles().subscribe(
      (result: any) => {
        this.autoecoles = result.data; // Mettre à jour la liste des auto-écoles
      },
      (error) => {
        console.error("Erreur lors de la récupération des auto-écoles", error);
      }
    );
  }



  deleteAutoecole(autoecole:any): void{
     this.autoecoleService.deleteAutoecole(autoecole.id_autoecole).subscribe(data=>{
       this.autoecoles = this.autoecoles.filter((u: any) => u !== autoecole);
     })
   }
}