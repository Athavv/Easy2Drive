import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isSidebarClosed = false; // État de la sidebar (ouvert/fermé)
  activeLink: string = 'home'; // Lien actif par défaut
  openSubMenus: { [key: string]: boolean } = {
    eleves: false,
    autoEcoles: false,
  }; // État des sous-menus

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

  // Méthode pour basculer l'état d'un sous-menu
  toggleSubMenu(menu: string) {
    // Si le sous-menu est déjà ouvert, on le ferme, sinon on ferme tous les sous-menus et on ouvre celui-ci
    if (this.openSubMenus[menu]) {
      this.openSubMenus[menu] = false;
    } else {
      // Ferme tous les sous-menus
      for (let key in this.openSubMenus) {
        this.openSubMenus[key] = false;
      }
      // Ouvre le sous-menu sélectionné
      this.openSubMenus[menu] = true;
    }
  }

  // Méthode pour vérifier si un sous-menu est ouvert
  isSubMenuOpen(menu: string): boolean {
    return this.openSubMenus[menu];
  }
}

