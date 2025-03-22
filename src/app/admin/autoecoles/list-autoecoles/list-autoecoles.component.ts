import { Component, OnInit } from '@angular/core';
import { AutoecoleService } from '../../../services/autoecole.service';
import { Autoecole } from '../../../modules/autoecoles';

@Component({
  selector: 'app-list-autoecoles',
  standalone: false,
  templateUrl: './list-autoecoles.component.html',
  styleUrls: ['./list-autoecoles.component.css']
})
export class ListAutoecolesComponent implements OnInit {
  autoecoles: any[] = [];
  showAddAutoecoleForm: boolean = false; // Contrôle l'affichage du formulaire

  constructor(private autoecoleService: AutoecoleService) {}

  ngOnInit(): void {
    this.loadAutoecoles();
  }

  // Charger la liste des auto-écoles
  loadAutoecoles(): void {
    this.autoecoleService.getAutoecoles().subscribe(
      (result: any) => {
        this.autoecoles = result.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des auto-écoles", error);
      }
    );
  }

  // Ouvrir le formulaire d'ajout
  openAddAutoecoleForm(): void {
    this.showAddAutoecoleForm = true;
  }

  // Fermer le formulaire d'ajout
  closeAddAutoecoleForm(): void {
    this.showAddAutoecoleForm = false;
    this.loadAutoecoles(); // Recharger la liste après l'ajout
  }

  // Supprimer une auto-école
  deleteAutoecole(autoecole: any): void {
    this.autoecoleService.deleteAutoecole(autoecole.id_autoecole).subscribe(data => {
      this.autoecoles = this.autoecoles.filter((u: any) => u !== autoecole);
    });
  }
}