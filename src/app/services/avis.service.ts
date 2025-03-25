import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = 'http://localhost/phprestAPI/avis';

  constructor(private http: HttpClient) {}

  getAvis(statut: string = 'Publié'): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/eleves/view.php?statut=${statut}`);
  }

  addAvis(avis: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/eleves/insert.php`, avis);
  }

  updateAvis(avis: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/eleves/update.php`, avis);
  }

  deleteAvisEleve(avisId: number, eleveId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eleves/delete.php?id=${avisId}&id_eleve=${eleveId}`);
  }

  // Méthodes admin (conservées mais non utilisées par l'élève)
  getAllAvis(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/admin-view.php`);
  }

  updateAvisStatut(id: number, statut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/update-statut.php`, { id_avis: id, statut });
  }

  deleteAvis(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/delete.php?id=${id}`);
  }
}