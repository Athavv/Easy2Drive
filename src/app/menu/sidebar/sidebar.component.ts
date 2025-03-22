import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isSidebarClosed = false; // État de la sidebar (ouvert/fermé)
  activeLink: string = 'home'; // Lien actif par défaut

  constructor(private authService: AuthService) {}

  // Méthode pour basculer l'état de la sidebar
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  // Méthode pour définir le lien actif
  setActive(link: string) {
    this.activeLink = link;
  }

  // Méthode pour vérifier si un lien est actif
  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  // Méthode pour gérer la déconnexion
  onLogout() {
    this.authService.logout();
  }
}