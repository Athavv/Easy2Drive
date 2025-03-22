import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service'; // Service pour les élèves
import { Score } from '../../../modules/score'; // Modèle Score

@Component({
  selector: 'app-scores-eleve',
  standalone: false,
  templateUrl: './scores-eleve.component.html', // Template HTML
  styleUrls: ['./scores-eleve.component.css'] // Fichier CSS
})
export class ScoresEleveComponent implements OnInit {
  scores: Score[] = []; // Liste des scores
  eleve_id: number; // ID de l'élève
  eleve: any; // Informations de l'élève
  newScore: Score = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 }; // Nouveau score
  showAddScoreForm: boolean = false; // Contrôle l'affichage du formulaire d'ajout
  showEditScoreForm: boolean = false; // Contrôle l'affichage du formulaire de modification
  editScoreData: Score = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 }; // Score à modifier

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService // Service pour les élèves
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'élève depuis l'URL
    this.eleve_id = +this.route.snapshot.params['id'];

    // Charger les informations de l'élève
    this.loadEleveInfo(this.eleve_id);

    // Charger les scores de l'élève
    this.loadScoresByEleve(this.eleve_id);
  }

  // Charger les informations de l'élève
  loadEleveInfo(id: number): void {
    this.eleveService.getSingleEleve(id).subscribe(
      (result: any) => {
        this.eleve = result.data; // Mettre à jour les informations de l'élève
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations de l'élève", error);
      }
    );
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

  // Ouvrir le formulaire d'ajout de score
  openAddScoreForm(): void {
    this.showAddScoreForm = true;
  }

  // Fermer le formulaire d'ajout de score
  closeAddScoreForm(): void {
    this.showAddScoreForm = false;
    this.newScore = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 }; // Réinitialiser le formulaire
  }

  // Ajouter un nouveau score
  addScore(): void {
    this.newScore.id_eleve = this.eleve_id; // Associer le score à l'élève
    this.eleveService.addScore(this.newScore).subscribe(
      (response: any) => {
        if (response.success) {
          // Recharger la liste des scores
          this.loadScoresByEleve(this.eleve_id);
          // Fermer le formulaire
          this.closeAddScoreForm();
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

  // Ouvrir le formulaire de modification de score
  openEditScoreForm(score: Score): void {
    this.showEditScoreForm = true;
    this.editScoreData = { ...score }; // Copier les données du score à modifier
  }

  // Fermer le formulaire de modification de score
  closeEditScoreForm(): void {
    this.showEditScoreForm = false;
    this.editScoreData = { id_score: 0, id_eleve: 0, theme: '', date_test: new Date().toISOString().split('T')[0], score: 0 }; // Réinitialiser le formulaire
  }

  // Modifier un score
  updateScore(): void {
    this.eleveService.updateScore(this.editScoreData).subscribe(
      (response: any) => {
        if (response.success) {
          // Recharger la liste des scores
          this.loadScoresByEleve(this.eleve_id);
          // Fermer le formulaire
          this.closeEditScoreForm();
        } else {
          alert('Erreur lors de la mise à jour du score');
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du score', error);
        alert('Erreur serveur, veuillez réessayer plus tard');
      }
    );
  }

  // Supprimer un score
  onDeleteScore(score: Score): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce score ?')) {
      this.eleveService.deleteScore(score.id_score).subscribe(
        (response: any) => {
          if (response.success) {
            // Filtrer la liste des scores pour supprimer le score supprimé
            this.scores = this.scores.filter((s: Score) => s.id_score !== score.id_score);
            alert('Score supprimé avec succès.');
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