import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve } from '../modules/eleves'; 
import { Score } from '../modules/score'; 

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  // URL de base de l'API PHP
  private baseUrl: string = 'http://localhost/phprestAPI/admin/'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les élèves
  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}eleves/view.php`);
  }

  // Récupérer un élève spécifique par son ID
  getSingleEleve(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}eleves/view.php?id=${id}`);
  }

  // Supprimer un élève par ID
  deleteEleve(id: number): Observable<any> {
    const url = `${this.baseUrl}eleves/delete.php?id=${id}`;
    return this.http.delete(url);
  }

  // Créer un nouvel élève
  createEleve(eleve: Eleve): Observable<any> {
    return this.http.post(`${this.baseUrl}eleves/insert.php`, eleve); 
  }

  // Modifier un élève existant
  editEleve(eleve: Eleve): Observable<any> {
    return this.http.put(`${this.baseUrl}eleves/update.php`, eleve);
  }

  // Méthode pour récupérer les auto-écoles (si nécessaire)
  getAutoecoleList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auto-ecole/get_autoecoles.php`);
  }

  getElevesByAutoecole(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}auto-ecole/get_eleves_by_autoecole.php?id_autoecole=${id}`);
  }

  getScoresByEleve(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}eleves/get_scores_by_eleve.php?id_eleve=${id}`);
  }
  
  addScore(score: Score): Observable<any> {
    return this.http.post(`${this.baseUrl}eleves/add_score.php`, score);
  }

  
  updateScore(score: any): Observable<any> {
    return this.http.put(`${this.baseUrl}eleves/update_score.php`, score);
  }
  
// Service Angular
deleteScore(id: number): Observable<any> {
  const url = `${this.baseUrl}eleves/delete_score.php?id=${id}`;
  return this.http.delete(url);
}
}