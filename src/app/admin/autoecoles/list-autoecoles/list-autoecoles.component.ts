import { Component, OnInit } from '@angular/core';
import { AutoecoleService } from '../../../services/autoecole.service';

@Component({
  selector: 'app-list-autoecoles',
  standalone: false,
  templateUrl: './list-autoecoles.component.html',
  styleUrls: ['./list-autoecoles.component.css']
})
export class ListAutoecolesComponent implements OnInit {
  autoecoles: any[] = [];
  showAddAutoecoleForm: boolean = false; // Contrôle l'affichage du formulaire d'ajout
  showEditModal: boolean = false; // Contrôle l'affichage de la modale de modification
  selectedAutoecole: any = null; // Stocke l'auto-école sélectionnée pour la modification

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

  // Ouvrir la modale de modification
  openEditModal(autoecole: any): void {
    this.selectedAutoecole = autoecole; // Stocke l'auto-école sélectionnée
    this.showEditModal = true; // Affiche la modale
  }

  // Fermer la modale de modification
  closeEditModal(): void {
    this.showEditModal = false; // Cache la modale
    this.selectedAutoecole = null; // Réinitialise l'auto-école sélectionnée
    this.loadAutoecoles(); // Recharge la liste des auto-écoles
  }

  // Fermer toutes les modales
  closeModals(): void {
    this.closeAddAutoecoleForm();
    this.closeEditModal();
  }

  // Supprimer une auto-école
  deleteAutoecole(autoecole: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette auto-école ?')) {
      this.autoecoleService.deleteAutoecole(autoecole.id_autoecole).subscribe(
        (response: any) => {
          if (response.success) {
            // Filtrer la liste des auto-écoles pour supprimer l'auto-école supprimée
            this.autoecoles = this.autoecoles.filter((e: any) => e.id_autoecole !== autoecole.id_autoecole);
            alert('Auto-école supprimée avec succès.');
          } else {
            alert('Erreur : ' + response.message);
          }
        },
        (error) => {
          console.error('Erreur HTTP :', error);
          alert('Impossible de se connecter au serveur.');
        }
      );
    }
  }
}