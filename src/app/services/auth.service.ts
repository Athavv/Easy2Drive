import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/phprestAPI/login.php'; // URL de l'API

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour se connecter
  login(identifiant: string, mot_de_passe: string, role: string) {
    return this.http.post(this.apiUrl, {
      identifiant: identifiant,
      mot_de_passe: mot_de_passe,
      role: role
    });
  }

  // Méthode pour récupérer les informations de l'élève
  getEleveInfo() {
    const userId = localStorage.getItem('user_id');
    return this.http.get(`http://localhost/phprestAPI/eleve/eleve.php?id=${userId}`);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_id');
  }

  // Méthode pour obtenir le rôle de l'utilisateur
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getScores(userId: any) {
    return this.http.get(`http://localhost/phprestAPI/eleve/score.php?id=${userId}`);
  }
}