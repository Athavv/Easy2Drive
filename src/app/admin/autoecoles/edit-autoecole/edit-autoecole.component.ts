import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoecoleService } from '../../../services/autoecole.service'; // Service pour les auto-écoles
import { Autoecole } from '../../../modules/autoecoles'; // Modèle pour les auto-écoles

@Component({
  selector: 'app-edit-autoecole',
  standalone: false,
  templateUrl: './edit-autoecole.component.html', // Template HTML
  styleUrls: ['./edit-autoecole.component.css'] // Fichier CSS
})
export class EditAutoecoleComponent implements OnInit {
  editForm: FormGroup; // Formulaire de modification
  autoecole_id: any; // ID de l'auto-école à modifier

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autoecoleService: AutoecoleService, // Service pour les auto-écoles
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.editForm = this.formBuilder.group({
      id_autoecole: [],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validation du numéro de téléphone
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.autoecole_id = this.route.snapshot.params['id']; // Récupérer l'ID de l'auto-école depuis l'URL

    if (this.autoecole_id > 0) {
      // Charger les données de l'auto-école à modifier
      this.autoecoleService.getSingleAutoecole(this.autoecole_id).subscribe(
        (response: any) => {
          if (response.success && response.data) {
            // Remplir le formulaire avec les données de l'auto-école
            this.editForm.patchValue({
              id_autoecole: response.data.id_autoecole,
              nom: response.data.nom,
              adresse: response.data.adresse,
              telephone: response.data.telephone,
              identifiant: response.data.identifiant,
              mot_de_passe: response.data.mot_de_passe
            });
          } else {
            alert('Aucune auto-école trouvée avec cet ID.');
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des données de l\'auto-école', error);
          alert('Erreur lors du chargement des données de l\'auto-école');
        }
      );
    }
  }

  // Méthode pour soumettre le formulaire de modification
  onEdit(): void {
    if (this.editForm.valid) {
      const updatedAutoecole: Autoecole = this.editForm.value;

      // Appeler le service pour mettre à jour l'auto-école
      this.autoecoleService.editAutoecole(updatedAutoecole).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/list-autoecoles']); // Rediriger vers la liste des auto-écoles
          } else {
            alert('Erreur lors de la mise à jour de l\'auto-école');
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'auto-école', error);
          alert('Erreur serveur, veuillez réessayer plus tard');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}