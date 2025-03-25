import { Component, OnInit } from '@angular/core';
import { AvisService } from '../../../services/avis.service';

@Component({
  selector: 'app-admin-avis',
  standalone: false,
  templateUrl: './admin-avis.component.html',
  styleUrls: ['./admin-avis.component.css']
})
export class AdminAvisComponent implements OnInit {
  avisList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private avisService: AvisService) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    this.avisService.getAllAvis().subscribe(
      (data: any) => {
        this.avisList = data.data;
        this.totalPages = Math.ceil(this.avisList.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Erreur de chargement des avis :', error);
      }
    );
  }

  getPaginatedAvis(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.avisList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateStatut(avis: any): void {
    this.avisService.updateAvisStatut(avis.id_avis, avis.statut).subscribe(
      (response) => {
        console.log('Statut mis à jour', response);
      },
      (error) => {
        console.error('Erreur de mise à jour', error);
      }
    );
  }

  deleteAvis(avis: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.avisService.deleteAvis(avis.id_avis).subscribe(
        (response) => {
          this.avisList = this.avisList.filter(a => a.id_avis !== avis.id_avis);
          this.totalPages = Math.ceil(this.avisList.length / this.itemsPerPage);
          if (this.currentPage > this.totalPages) {
            this.currentPage = Math.max(1, this.totalPages);
          }
        },
        (error) => {
          console.error('Erreur de suppression', error);
        }
      );
    }
  }
}