import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Rôle attendu pour la route
    const userRole = this.authService.getUserRole(); // Rôle de l'utilisateur connecté

    // Vérifier si l'utilisateur est connecté et a le bon rôle
    if (this.authService.isLoggedIn() && userRole === expectedRole) {
      return true; // Autoriser l'accès
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return false;
    }
  }
}