import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autoecole } from '../modules/autoecoles';

@Injectable({
  providedIn: 'root'
})
export class AutoecoleService {

  // URL de base de l'API PHP
  private baseUrl: string = 'http://localhost/phprestAPI/';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les auto-écoles
  getAutoecoles(): Observable<Autoecole[]> {
    return this.http.get<Autoecole[]>(`${this.baseUrl}admin/autoecoles/view.php`);
  }

  // Récupérer une auto-école spécifique par son ID
  getSingleAutoecole(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/autoecoles/view.php?id=${id}`);
  }

  // Supprimer une auto-école par ID
  deleteAutoecole(id: number): Observable<any> {
    const url = `${this.baseUrl}admin/autoecoles/delete.php?id=${id}`;
    console.log('URL de suppression :', url); // Pour déboguer
    return this.http.delete(url);
  }

  // Créer une nouvelle auto-école
  createAutoecole(autoecole: Autoecole): Observable<any> {
    return this.http.post(`${this.baseUrl}admin/autoecoles/insert.php`, autoecole);
  }

  // Modifier une auto-école existante
  editAutoecole(autoecole: Autoecole): Observable<any> {
    return this.http.put(`${this.baseUrl}admin/autoecoles/update.php`, autoecole);
  }
}