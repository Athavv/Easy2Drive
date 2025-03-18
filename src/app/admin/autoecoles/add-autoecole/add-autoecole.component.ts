import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoecoleService } from '../../../services/autoecole.service'; // Service pour les auto-écoles
import { Autoecole } from '../../../modules/autoecoles'; // Modèle pour les auto-écoles

@Component({
  selector: 'app-add-autoecole',
  standalone: false,
  templateUrl: './add-autoecole.component.html', // Template HTML
  styleUrls: ['./add-autoecole.component.css'] // Fichier CSS
})
export class AddAutoecoleComponent implements OnInit {
  addForm: FormGroup; // Formulaire d'ajout

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private autoecoleService: AutoecoleService // Service pour les auto-écoles
  ) {
    // Initialisation du formulaire
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validation du numéro de téléphone
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Aucune action supplémentaire à l'initialisation
  }

  // Méthode pour soumettre le formulaire d'ajout
  onSubmit(): void {
    if (this.addForm.valid) {
      const newAutoecole: Autoecole = this.addForm.value;

      // Appeler le service pour créer une nouvelle auto-école
      this.autoecoleService.createAutoecole(newAutoecole).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/list-autoecoles']); // Rediriger vers la liste des auto-écoles
          } else {
            alert('Erreur lors de l\'ajout de l\'auto-école');
          }
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'auto-école', error);
          alert('Erreur serveur, veuillez réessayer plus tard');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}