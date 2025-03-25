import { Component, OnInit } from '@angular/core';
import { AutoecoleService } from '../../../services/autoecole.service';

@Component({
  selector: 'app-list-autoecoles',
  standalone: false,
  templateUrl: './list-autoecoles.component.html',
  styleUrls: ['./list-autoecoles.component.css']
})
export class ListAutoecolesComponent implements OnInit {
  autoecoles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showAddAutoecoleForm: boolean = false;
  showEditModal: boolean = false;
  selectedAutoecole: any = null;

  constructor(private autoecoleService: AutoecoleService) {}

  ngOnInit(): void {
    this.loadAutoecoles();
  }

  loadAutoecoles(): void {
    this.autoecoleService.getAutoecoles().subscribe(
      (result: any) => {
        this.autoecoles = result.data;
        this.totalPages = Math.ceil(this.autoecoles.length / this.itemsPerPage);
        this.currentPage = 1;
      },
      (error) => {
        console.error("Erreur lors de la récupération des auto-écoles", error);
      }
    );
  }

  getPaginatedAutoecoles(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.autoecoles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddAutoecoleForm(): void {
    this.showAddAutoecoleForm = true;
  }

  closeAddAutoecoleForm(): void {
    this.showAddAutoecoleForm = false;
    this.loadAutoecoles();
  }

  openEditModal(autoecole: any): void {
    this.selectedAutoecole = autoecole;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedAutoecole = null;
    this.loadAutoecoles();
  }

  closeModals(): void {
    this.closeAddAutoecoleForm();
    this.closeEditModal();
  }

  deleteAutoecole(autoecole: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette auto-école ?')) {
      this.autoecoleService.deleteAutoecole(autoecole.id_autoecole).subscribe(
        (response: any) => {
          if (response.success) {
            this.autoecoles = this.autoecoles.filter((e: any) => e.id_autoecole !== autoecole.id_autoecole);
            this.totalPages = Math.ceil(this.autoecoles.length / this.itemsPerPage);
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