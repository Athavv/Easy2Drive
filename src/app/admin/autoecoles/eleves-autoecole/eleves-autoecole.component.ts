import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service'; // Service pour les élèves
import { Eleve } from '../../../modules/eleves'; // Modèle pour les élèves

@Component({
  selector: 'app-eleves-autoecole',
    standalone: false,
  templateUrl: './eleves-autoecole.component.html', // Template HTML
  styleUrls: ['./eleves-autoecole.component.css'] // Fichier CSS
})
export class ElevesAutoecoleComponent implements OnInit {
  eleves: Eleve[] = []; // Liste des élèves
  autoecole_id: number; // ID de l'auto-école

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService // Service pour les élèves
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'auto-école depuis l'URL
    this.autoecole_id = +this.route.snapshot.params['id'];

    // Charger les élèves de l'auto-école
    this.loadElevesByAutoecole(this.autoecole_id);
  }

  // Charger les élèves de l'auto-école
  loadElevesByAutoecole(id: number): void {
    this.eleveService.getElevesByAutoecole(id).subscribe(
      (result: any) => {
        this.eleves = result.data; // Mettre à jour la liste des élèves
      },
      (error) => {
        console.error("Erreur lors de la récupération des élèves", error);
      }
    );
  }
}