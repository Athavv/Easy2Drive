import { Component, OnInit } from '@angular/core';
import { AvisService } from '../../services/avis.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-avis',
  standalone: false,
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  avisList: any[] = [];
  newAvis: any = { commentaire: '' };
  showAddAvisModal: boolean = false;
  showEditModal: boolean = false;
  userId: number | null = null;
  selectedAvis: any = null;

  constructor(private avisService: AvisService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAvis();
    this.getUserId();
  }

  getUserId(): void {
    this.authService.getEleveInfo().subscribe(
      (eleveInfo: any) => {
        if (eleveInfo && eleveInfo.id_eleve) {
          this.userId = eleveInfo.id_eleve;
        } else {
          console.error('ID de l\'élève non trouvé');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'élève', error);
      }
    );
  }

  loadAvis(): void {
    this.avisService.getAvis().subscribe(
      (response: any) => {
        this.avisList = response.data;
      },
      (error) => {
        console.error('Erreur lors du chargement des avis', error);
      }
    );
  }

  openAddAvisModal(): void {
    this.showAddAvisModal = true;
  }

  closeAddAvisModal(): void {
    this.showAddAvisModal = false;
  }

  openEditModal(avis: any): void {
    this.selectedAvis = { ...avis };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedAvis = null;
  }

  submitAvis(): void {
    if (this.userId) {
      this.newAvis.id_eleve = this.userId;
      this.avisService.addAvis(this.newAvis).subscribe(
        (response) => {
          console.log('Avis ajouté avec succès', response);
          this.loadAvis();
          this.newAvis = { commentaire: '' };
          this.closeAddAvisModal();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'avis', error);
        }
      );
    } else {
      console.error('ID de l\'élève non trouvé');
    }
  }

  updateAvis(): void {
    if (this.userId && this.selectedAvis) {
      this.selectedAvis.id_eleve = this.userId;
      this.avisService.updateAvis(this.selectedAvis).subscribe(
        (response) => {
          console.log('Avis mis à jour avec succès', response);
          this.loadAvis();
          this.closeEditModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'avis', error);
        }
      );
    }
  }

  deleteAvis(avisId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?') && this.userId) {
      this.avisService.deleteAvisEleve(avisId, this.userId).subscribe(
        (response) => {
          console.log('Avis supprimé avec succès', response);
          this.loadAvis();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'avis', error);
        }
      );
    }
  }
}