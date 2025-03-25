import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AvisService } from '../../services/avis.service';

@Component({
  selector: 'app-home-eleve',
  standalone: false,
  templateUrl: './home-eleve.component.html',
  styleUrls: ['./home-eleve.component.css']
})
export class HomeEleveComponent implements OnInit {
  eleve: any = null;
  scores: any[] = [];
  avisList: any[] = [];

  // Pagination pour les avis
  currentAvisPage: number = 1;
  avisPerPage: number = 3;
  totalAvisPages: number = 0;

  // Pagination pour les scores (10 par page)
  currentScorePage: number = 1;
  scoresPerPage: number = 10;
  totalScorePages: number = 0;

  constructor(
    private authService: AuthService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.loadEleveInfo();
    this.loadScores();
    this.loadAvis();
  }

  loadEleveInfo() {
    this.authService.getEleveInfo().subscribe({
      next: (response: any) => {
        this.eleve = response;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des informations :', error);
      }
    });
  }

  loadScores() {
    const userId = localStorage.getItem('user_id');
    this.authService.getScores(userId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.scores = response.data;
          this.totalScorePages = Math.ceil(this.scores.length / this.scoresPerPage);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des scores :', error);
      }
    });
  }

  loadAvis() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.avisService.getAvisByEleve(+userId).subscribe({
        next: (response: any) => {
          this.avisList = response.data || [];
          this.totalAvisPages = Math.ceil(this.avisList.length / this.avisPerPage);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des avis :', error);
        }
      });
    }
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

  getPaginatedScores(): any[] {
    const startIndex = (this.currentScorePage - 1) * this.scoresPerPage;
    return this.scores.slice(startIndex, startIndex + this.scoresPerPage);
  }

  changeScorePage(page: number): void {
    if (page >= 1 && page <= this.totalScorePages) {
      this.currentScorePage = page;
    }
  }

  getPages(totalPages: number): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  calculateAge(dateNaissance: string): number {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  onLogout() {
    this.authService.logout();
  }
}