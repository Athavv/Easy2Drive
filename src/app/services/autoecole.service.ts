import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autoecole } from '../modules/autoecoles';

@Injectable({
  providedIn: 'root'
})
export class AutoecoleService {
  private apiUrl = 'http://easy2drive.free.nf/phprestAPI/admin/auto-ecole'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Créer une nouvelle auto-école
  createAutoecole(autoecole: Autoecole): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert.php`, autoecole);
  }

  // Récupérer toutes les auto-écoles
  getAutoecoles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view.php`);
  }

  // Supprimer une auto-école par ID
  deleteAutoecole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
  }

    // Récupérer une auto-école par son ID
  getSingleAutoecole(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view.php?id=${id}`);
  }
  
  // Modifier une auto-école
  editAutoecole(autoecole: Autoecole): Observable<any> {
    return this.http.put(`${this.apiUrl}/update.php`, autoecole);
  }


  
}