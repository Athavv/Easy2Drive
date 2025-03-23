import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost/phprestAPI/avis'; // URL de l'API pour les avis

  constructor(private http: HttpClient) {}

  // Récupérer tous les avis
  getAvis(): Observable<any> {
    return this.http.get(`${this.apiUrl}/view.php`);
  }

  // Ajouter un nouvel avis
  addAvis(avis: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert.php`, avis);
  }
}