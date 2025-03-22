import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoecoleService } from '../../../services/autoecole.service';
import { Autoecole } from '../../../modules/autoecoles';

@Component({
  selector: 'app-add-autoecole',
  standalone : false,
  templateUrl: './add-autoecole.component.html',
  styleUrls: ['./add-autoecole.component.css']
})
export class AddAutoecoleComponent {
  @Output() closeForm = new EventEmitter<void>(); // Émet un événement pour fermer le formulaire
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autoecoleService: AutoecoleService
  ) {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.addForm.valid) {
      const newAutoecole: Autoecole = this.addForm.value;
      this.autoecoleService.createAutoecole(newAutoecole).subscribe(
        (response: any) => {
          if (response.success) {
            this.closeForm.emit(); // Fermer le formulaire après l'ajout
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