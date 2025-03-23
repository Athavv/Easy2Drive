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
  avisList: any[] = []; // Liste des avis
  newAvis: any = { commentaire: '' }; // Nouvel avis à soumettre
  showAddAvisModal: boolean = false; // Contrôle l'affichage du pop-up
  userId: number | null = null; // ID de l'élève connecté

  constructor(private avisService: AvisService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAvis(); // Charger les avis au démarrage
    this.getUserId(); // Récupérer l'ID de l'élève connecté
  }

  // Récupérer l'ID de l'élève connecté
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

  // Charger les avis depuis l'API
  loadAvis(): void {
    this.avisService.getAvis().subscribe(
      (response: any) => {
        this.avisList = response.data; // Extraire le tableau de la réponse
      },
      (error) => {
        console.error('Erreur lors du chargement des avis', error);
      }
    );
  }

  // Ouvrir le pop-up pour ajouter un avis
  openAddAvisModal(): void {
    this.showAddAvisModal = true;
  }

  // Fermer le pop-up
  closeAddAvisModal(): void {
    this.showAddAvisModal = false;
  }

  // Soumettre un nouvel avis
  submitAvis(): void {
    if (this.userId) {
      this.newAvis.id_eleve = this.userId; // Ajouter l'ID de l'élève à l'avis
      this.avisService.addAvis(this.newAvis).subscribe(
        (response) => {
          console.log('Avis ajouté avec succès', response);
          this.loadAvis(); // Recharger les avis après soumission
          this.newAvis = { commentaire: '' }; // Réinitialiser le formulaire
          this.closeAddAvisModal(); // Fermer le pop-up
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'avis', error);
        }
      );
    } else {
      console.error('ID de l\'élève non trouvé');
    }
  }
}