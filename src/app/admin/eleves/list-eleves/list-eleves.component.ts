import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../../services/eleve.service';

@Component({
  selector: 'app-list-eleves',
  standalone: false,
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showAddEleveForm: boolean = false;
  showEditModal: boolean = false;
  selectedEleve: any = null;

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.loadEleves();
  }

  loadEleves(): void {
    this.eleveService.getEleves().subscribe(
      (result: any) => {
        this.eleves = result.data;
        this.totalPages = Math.ceil(this.eleves.length / this.itemsPerPage);
      },
      (error) => {
        console.error("Erreur lors de la récupération des élèves", error);
      }
    );
  }

  getPaginatedEleves(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.eleves.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddEleveForm(): void {
    this.showAddEleveForm = true;
  }

  closeAddEleveForm(): void {
    this.showAddEleveForm = false;
    this.loadEleves();
  }

  openEditModal(eleve: any): void {
    this.selectedEleve = eleve;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedEleve = null;
    this.loadEleves();
  }

  closeModals(): void {
    this.closeAddEleveForm();
    this.closeEditModal();
  }

  deleteEleve(eleve: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      this.eleveService.deleteEleve(eleve.id_eleve).subscribe(
        (response: any) => {
          if (response.success) {
            this.eleves = this.eleves.filter((e: any) => e.id_eleve !== eleve.id_eleve);
            this.totalPages = Math.ceil(this.eleves.length / this.itemsPerPage);
            if (this.currentPage > this.totalPages) {
              this.currentPage = Math.max(1, this.totalPages);
            }
          }
        },
        (error) => {
          console.error('Erreur HTTP :', error);
          alert('Impossible de se connecter au serveur.');
        }
      );
    }
  }
}