import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service'; // Service pour les élèves
import { AutoecoleService } from '../../../services/autoecole.service'; // Service pour les auto-écoles
import { Eleve } from '../../../modules/eleves'; // Modèle pour les élèves
import { Autoecole } from '../../../modules/autoecoles'; // Modèle pour les auto-écoles

@Component({
  selector: 'app-eleves-autoecole',
  standalone: false,
  templateUrl: './eleves-autoecole.component.html', // Template HTML
  styleUrls: ['./eleves-autoecole.component.css'] // Fichier CSS
})
export class ElevesAutoecoleComponent implements OnInit {
  eleves: Eleve[] = []; // Liste des élèves
  autoecole: Autoecole | null = null; // Informations de l'auto-école
  autoecole_id: number; // ID de l'auto-école

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService, // Service pour les élèves
    private autoecoleService: AutoecoleService // Service pour les auto-écoles
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'auto-école depuis l'URL
    this.autoecole_id = +this.route.snapshot.params['id'];

    // Charger les informations de l'auto-école
    this.loadAutoecoleInfo(this.autoecole_id);

    // Charger les élèves de l'auto-école
    this.loadElevesByAutoecole(this.autoecole_id);
  }

  // Charger les informations de l'auto-école
  loadAutoecoleInfo(id: number): void {
    this.autoecoleService.getSingleAutoecole(id).subscribe(
      (result: any) => {
        this.autoecole = result.data; // Mettre à jour les informations de l'auto-école
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations de l'auto-école", error);
      }
    );
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