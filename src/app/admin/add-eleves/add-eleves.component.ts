import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EleveService } from '../../services/eleve.service';
import { Eleve } from '../../eleves'; 

@Component({
  selector: 'app-add-eleves',
  standalone: false,
  templateUrl: './add-eleves.component.html',
  styleUrls: ['./add-eleves.component.css']
})
export class AddElevesComponent implements OnInit {
  addForm: FormGroup;
  autoecoleList: any[] = []; // Liste des auto-écoles pour le choix dans le formulaire

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eleveService: EleveService // Service pour l'élève
  ) {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      date_naissance: ['', Validators.required],
      adresse: ['', Validators.maxLength(255)],
      date_inscription: [new Date().toISOString().split('T')[0], Validators.required],  // Ajout de la date d'inscription
      npeh: ['', Validators.maxLength(50)], 
      identifiant: ['', [Validators.required, Validators.maxLength(50)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', Validators.required],
      id_autoecole: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.loadAutoecoleList(); // Chargement des auto-écoles pour le choix dans le formulaire
  }

  // Méthode pour charger la liste des auto-écoles (à adapter si nécessaire)
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
      // Envoi des données du formulaire à l'API PHP pour ajouter l'élève
      const newEleve: Eleve = this.addForm.value; // Typage avec l'interface Eleve
      this.eleveService.createEleve(newEleve).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/']);  // Rediriger vers la liste des élèves ou autre page
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
