import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../eleves'; // Assure-toi d'importer le bon modèle

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  // URL de base de l'API PHP
  private baseUrl: string = 'http://localhost/phprestAPI/'; // Remplace par l'URL correcte

  constructor(private http: HttpClient) {}

  // Récupérer tous les élèves
  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}view.php`);
  }

  // Récupérer un élève spécifique par son ID
  getSingleEleve(id: any): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.baseUrl}view.php?id=${id}`);
  }

  // Supprimer un élève par ID
  deleteEleve(id: number): Observable<any> {
    const url = `${this.baseUrl}delete.php?id=${id}`;
    console.log('URL de suppression :', url); // Vérifie si l'URL est correcte
    return this.http.delete(url);
  }

  // Créer un nouvel élève
  createEleve(eleve: Eleve): Observable<any> {
    return this.http.post(`${this.baseUrl}insert.php`, eleve); // Envoie de l'objet élève
  }

  // Modifier un élève existant
  editEleve(eleve: Eleve): Observable<any> {
    return this.http.put(`${this.baseUrl}update.php`, eleve);
  }

  // Méthode pour récupérer les auto-écoles (si nécessaire)
  getAutoecoleList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}autoecole.php`); // Assure-toi que cette API existe
  }
}
