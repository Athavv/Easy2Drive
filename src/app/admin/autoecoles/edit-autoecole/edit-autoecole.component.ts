import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoecoleService } from '../../../services/autoecole.service';
import { Autoecole } from '../../../modules/autoecoles';

@Component({
  selector: 'app-edit-autoecole',
  standalone: false,
  templateUrl: './edit-autoecole.component.html',
  styleUrls: ['./edit-autoecole.component.css']
})
export class EditAutoecoleComponent implements OnInit {
  @Input() autoecole: any; // Auto-école à modifier
  @Output() closeForm = new EventEmitter<void>(); // Émet un événement pour fermer le formulaire
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autoecoleService: AutoecoleService
  ) {
    this.editForm = this.formBuilder.group({
      id_autoecole: [],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.autoecole) {
      this.editForm.patchValue(this.autoecole); // Remplir le formulaire avec les données de l'auto-école
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
            this.closeForm.emit(); // Fermer le formulaire après la modification
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