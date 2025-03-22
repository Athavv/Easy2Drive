import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-eleve',
  standalone: false,
  templateUrl: './home-eleve.component.html',
  styleUrls: ['./home-eleve.component.css']
})
export class HomeEleveComponent implements OnInit {
  eleve: any = null;
  scores: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadEleveInfo();
    this.loadScores();
  }

  // Charger les informations de l'élève
  loadEleveInfo() {
    this.authService.getEleveInfo().subscribe({
      next: (response: any) => {
        console.log('Réponse de getEleveInfo :', response); // Ajoutez ce log
        this.eleve = response;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des informations :', error);
      }
    });
  }

  // Charger les scores de l'élève
  loadScores() {
    const userId = localStorage.getItem('user_id');
    this.authService.getScores(userId).subscribe({
        next: (response: any) => {
            if (response.success) {
                this.scores = response.data;
            } else {
                console.error('Erreur API :', response.message);
            }
        },
        error: (error) => {
            console.error('Erreur HTTP :', error);
        }
    });
}

    // Méthode pour gérer la déconnexion
    onLogout() {
      this.authService.logout();
    }
}