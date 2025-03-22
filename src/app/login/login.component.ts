import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  identifiant: string = '';
  mot_de_passe: string = '';
  role: string = 'eleve'; // Par défaut, on essaie de se connecter en tant qu'élève

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, redirigez-le vers la page appropriée
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'admin') {
        this.router.navigate(['/Admin-Home']);
      } else if (userRole === 'eleve') {
        this.router.navigate(['/eleve/home-eleve']);
      }
    }
  }

  onSubmit() {
    if (!this.identifiant || !this.mot_de_passe || !this.role) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    this.authService.login(this.identifiant, this.mot_de_passe, this.role).subscribe({
      next: (response: any) => {
        if (response && response.success) { // Vérifier si la réponse existe et a un succès
          // Stocker les informations de l'utilisateur dans le localStorage
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('role', response.user.role);
  
          // Rediriger en fonction du rôle
          if (response.user.role === 'admin') {
            this.router.navigate(['/Admin-Home']);
          } else if (response.user.role === 'eleve') {
            this.router.navigate(['/eleve/profil']);
          }
        } else {
          alert(response?.message || 'Réponse inattendue de l\'API.');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la connexion :', error);
        alert('Erreur lors de la connexion. Veuillez réessayer.');
      }
    });
  }
}