import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../../services/eleve.service';

@Component({
  selector: 'app-list-eleves',
  standalone: false,
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: any[] = [];
  showAddEleveForm: boolean = false; // Contrôle l'affichage du formulaire

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.loadEleves();
  }

  // Charger la liste des élèves
  loadEleves(): void {
    this.eleveService.getEleves().subscribe(
      (result: any) => {
        this.eleves = result.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des élèves", error);
      }
    );
  }

  // Ouvrir le formulaire d'ajout
  openAddEleveForm(): void {
    this.showAddEleveForm = true;
  }

  // Fermer le formulaire d'ajout
  closeAddEleveForm(): void {
    this.showAddEleveForm = false;
    this.loadEleves(); // Recharger la liste après l'ajout
  }

  // Supprimer un élève
  deleteEleve(eleve: any): void {
    this.eleveService.deleteEleve(eleve.id_eleve).subscribe(data => {
      this.eleves = this.eleves.filter((u: any) => u !== eleve);
    });
  }
}