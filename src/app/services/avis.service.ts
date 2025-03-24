import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost/phprestAPI/avis'; // URL de l'API pour les avis

  constructor(private http: HttpClient) {}

  getAvis(statut: string = 'Publié'): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/view.php?statut=${statut}`);
  }

  addAvis(avis: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert.php`, avis);
  }

  getAllAvis(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin-view.php`);
  }

  updateAvisStatut(id: number, statut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-statut.php`, { id_avis: id, statut });
  }

  deleteAvis(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
  }
}