import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service'; // Service pour les élèves
import { Score } from '../../../modules/score'; // Importe le modèle Score

@Component({
  selector: 'app-scores-eleve',
  standalone: false,
  templateUrl: './scores-eleve.component.html', // Template HTML
  styleUrls: ['./scores-eleve.component.css'] // Fichier CSS
})
export class ScoresEleveComponent implements OnInit {
  scores: Score[] = []; // Liste des scores (utilise le modèle Score)
  eleve_id: number; // ID de l'élève
  newScore: Score = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 }; // Nouveau score

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService // Service pour les élèves
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'élève depuis l'URL
    this.eleve_id = +this.route.snapshot.params['id'];

    // Charger les scores de l'élève
    this.loadScoresByEleve(this.eleve_id);
  }

  // Charger les scores de l'élève
  loadScoresByEleve(id: number): void {
    this.eleveService.getScoresByEleve(id).subscribe(
      (result: any) => {
        this.scores = result.data; // Mettre à jour la liste des scores
      },
      (error) => {
        console.error("Erreur lors de la récupération des scores", error);
      }
    );
  }

  // Ajouter un nouveau score
  addScore(): void {
    this.newScore.id_eleve = this.eleve_id; // Associer le score à l'élève
    this.eleveService.addScore(this.newScore).subscribe(
      (response: any) => {
        if (response.success) {
          // Recharger la liste des scores
          this.loadScoresByEleve(this.eleve_id);
          // Réinitialiser le formulaire
          this.newScore = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 };
        } else {
          alert('Erreur lors de l\'ajout du score');
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du score', error);
        alert('Erreur serveur, veuillez réessayer plus tard');
      }
    );
  }
}