import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EleveService } from '../../../services/eleve.service';
import { Eleve } from '../../../modules/eleves';

@Component({
  selector: 'app-edit-eleves',
  standalone: false,
  templateUrl: './edit-eleves.component.html',
  styleUrls: ['./edit-eleves.component.css']
})
export class EditElevesComponent implements OnInit {
  @Input() eleve: any; // Élève à modifier
  @Output() closeForm = new EventEmitter<void>(); // Émet un événement pour fermer le formulaire
  editForm: FormGroup;
  autoecoleList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eleveService: EleveService
  ) {
    this.editForm = this.formBuilder.group({
      id_eleve: [],
      nom: ['', Validators.required],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.maxLength(255)],
      date_inscription: [new Date().toISOString().split('T')[0]],
      npeh: [''],
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
      id_autoecole: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.eleve) {
      this.editForm.patchValue(this.eleve);
    }
    this.loadAutoecoleList();
  }

  loadAutoecoleList() {
    this.eleveService.getAutoecoleList().subscribe(
      (data: any) => {
        this.autoecoleList = data;
      },
      error => {
        console.error('Erreur lors du chargement des auto-écoles', error);
      }
    );
  }

  onEdit(): void {
    if (this.editForm.valid) {
      const updatedEleve: Eleve = this.editForm.value;
      this.eleveService.editEleve(updatedEleve).subscribe(
        (response: any) => {
          if (response.success) {
            this.closeForm.emit(); // Fermer le formulaire après la modification
          } else {
            alert('Erreur lors de la mise à jour de l\'élève');
          }
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'élève', error);
          alert('Erreur serveur, veuillez réessayer plus tard');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}