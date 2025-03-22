import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EleveService } from '../../../services/eleve.service';
import { Eleve } from '../../../modules/eleves';

@Component({
  selector: 'app-add-eleves',
  standalone: false,
  templateUrl: './add-eleves.component.html',
  styleUrls: ['./add-eleves.component.css']
})
export class AddElevesComponent {
  @Output() closeForm = new EventEmitter<void>(); // Émet un événement pour fermer le formulaire
  addForm: FormGroup;
  autoecoleList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eleveService: EleveService
  ) {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.maxLength(255)],
      date_inscription: [new Date().toISOString().split('T')[0], Validators.required],
      npeh: ['', Validators.maxLength(50)],
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
      id_autoecole: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.addForm.valid) {
      const newEleve: Eleve = this.addForm.value;
      this.eleveService.createEleve(newEleve).subscribe(
        (response: any) => {
          if (response.success) {
            this.closeForm.emit(); // Fermer le formulaire après l'ajout
          } else {
            alert('Erreur lors de l\'ajout de l\'élève');
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'élève', error);
          alert('Erreur serveur, veuillez réessayer plus tard');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}