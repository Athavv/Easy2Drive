import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../modules/eleves'; 

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  // URL de base de l'API PHP
  private baseUrl: string = 'http://localhost/phprestAPI/'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les élèves
  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}admin/eleves/view.php`);
  }

  // Récupérer un élève spécifique par son ID
  getSingleEleve(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/eleves/view.php?id=${id}`);
  }

  // Supprimer un élève par ID
  deleteEleve(id: number): Observable<any> {
    const url = `${this.baseUrl}admin/eleves/delete.php?id=${id}`;
    return this.http.delete(url);
  }

  // Créer un nouvel élève
  createEleve(eleve: Eleve): Observable<any> {
    return this.http.post(`${this.baseUrl}admin/eleves/insert.php`, eleve); 
  }

  // Modifier un élève existant
  editEleve(eleve: Eleve): Observable<any> {
    return this.http.put(`${this.baseUrl}admin/eleves/update.php`, eleve);
  }

  // Méthode pour récupérer les auto-écoles (si nécessaire)
  getAutoecoleList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/auto-ecole/get_autoecoles.php`);
  }
}