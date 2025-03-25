import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service';
import { Score } from '../../../modules/score';
import { AvisService } from '../../../services/avis.service';

@Component({
  selector: 'app-scores-eleve',
  standalone: false,
  templateUrl: './scores-eleve.component.html',
  styleUrls: ['./scores-eleve.component.css']
})
export class ScoresEleveComponent implements OnInit {
  scores: Score[] = [];
  eleve_id: number;
  eleve: any;
  newScore: Score = { 
    id_score: 0, 
    id_eleve: 0, 
    theme: '', 
    date_test: new Date().toISOString().split('T')[0], 
    score: 0 
  };
  showAddScoreForm: boolean = false;
  showEditScoreForm: boolean = false;
  editScoreData: Score = { 
    id_score: 0, 
    id_eleve: 0, 
    theme: '', 
    date_test: new Date().toISOString().split('T')[0], 
    score: 0 
  };
  
  // Propriétés pour la pagination des scores
  currentScorePage: number = 1;
  scoresPerPage: number = 10;
  totalScores: number = 0;
  totalScorePages: number = 0;
  
  // Propriétés pour la gestion des avis
  avisList: any[] = [];
  currentAvisPage: number = 1;
  avisPerPage: number = 3;
  totalAvis: number = 0;
  totalAvisPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.eleve_id = +this.route.snapshot.params['id'];
    this.loadEleveInfo(this.eleve_id);
    this.loadScoresByEleve(this.eleve_id);
    this.loadAvisByEleve(this.eleve_id);
  }

  loadEleveInfo(id: number): void {
    this.eleveService.getSingleEleve(id).subscribe(
      (result: any) => {
        this.eleve = result.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations de l'élève", error);
      }
    );
  }

  loadScoresByEleve(id: number): void {
    this.eleveService.getScoresByEleve(id).subscribe(
      (result: any) => {
        this.scores = result.data;
        this.totalScores = this.scores.length;
        this.totalScorePages = Math.ceil(this.totalScores / this.scoresPerPage);
      },
      (error) => {
        console.error("Erreur lors de la récupération des scores", error);
      }
    );
  }

  getPaginatedScores(): Score[] {
    const startIndex = (this.currentScorePage - 1) * this.scoresPerPage;
    return this.scores.slice(startIndex, startIndex + this.scoresPerPage);
  }

  changeScorePage(page: number): void {
    if (page >= 1 && page <= this.totalScorePages) {
      this.currentScorePage = page;
    }
  }

  loadAvisByEleve(id: number): void {
    this.avisService.getAvisByEleve(id).subscribe(
      (response: any) => {
        this.avisList = response.data;
        this.totalAvis = this.avisList.length;
        this.totalAvisPages = Math.ceil(this.totalAvis / this.avisPerPage);
      },
      (error) => {
        console.error('Erreur lors du chargement des avis', error);
      }
    );
  }

  getPaginatedAvis(): any[] {
    const startIndex = (this.currentAvisPage - 1) * this.avisPerPage;
    return this.avisList.slice(startIndex, startIndex + this.avisPerPage);
  }

  changeAvisPage(page: number): void {
    if (page >= 1 && page <= this.totalAvisPages) {
      this.currentAvisPage = page;
    }
  }

  updateAvisStatut(avis: any): void {
    this.avisService.updateAvisStatut(avis.id_avis, avis.statut).subscribe(
      (response) => {
        console.log('Statut mis à jour', response);
      },
      (error) => {
        console.error('Erreur de mise à jour', error);
      }
    );
  }

  // Méthodes existantes pour la gestion des scores...
  openAddScoreForm(): void {
    this.showAddScoreForm = true;
  }

  closeAddScoreForm(): void {
    this.showAddScoreForm = false;
    this.newScore = { 
      id_score: 0, 
      id_eleve: 0, 
      theme: '', 
      date_test: new Date().toISOString().split('T')[0], 
      score: 0 
    };
  }

  addScore(): void {
    this.newScore.id_eleve = this.eleve_id;
    this.eleveService.addScore(this.newScore).subscribe(
      (response: any) => {
        if (response.success) {
          this.loadScoresByEleve(this.eleve_id);
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

  openEditScoreForm(score: Score): void {
    this.showEditScoreForm = true;
    this.editScoreData = { ...score };
  }

  closeEditScoreForm(): void {
    this.showEditScoreForm = false;
    this.editScoreData = { 
      id_score: 0, 
      id_eleve: 0, 
      theme: '', 
      date_test: new Date().toISOString().split('T')[0], 
      score: 0 
    };
  }

  updateScore(): void {
    this.eleveService.updateScore(this.editScoreData).subscribe(
      (response: any) => {
        if (response.success) {
          this.loadScoresByEleve(this.eleve_id);
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

  onDeleteScore(score: Score): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce score ?')) {
      this.eleveService.deleteScore(score.id_score).subscribe(
        (response: any) => {
          if (response.success) {
            this.scores = this.scores.filter((s: Score) => s.id_score !== score.id_score);
            this.totalScores = this.scores.length;
            this.totalScorePages = Math.ceil(this.totalScores / this.scoresPerPage);
            if (this.currentScorePage > this.totalScorePages) {
              this.currentScorePage = Math.max(1, this.totalScorePages);
            }
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