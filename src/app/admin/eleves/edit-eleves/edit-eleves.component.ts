import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../../../services/eleve.service';
import { Eleve } from '../../../modules/eleves';

@Component({
  selector: 'app-edit-eleves',
  standalone:false,
  templateUrl: './edit-eleves.component.html',
  styleUrls: ['./edit-eleves.component.css']
})
export class EditElevesComponent implements OnInit {
  editForm: FormGroup;
  autoecoleList: any[] = []; 
  eleve_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eleveService: EleveService,
    private route: ActivatedRoute
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
    this.eleve_id = this.route.snapshot.params['id']; 
  
    if (this.eleve_id > 0) {
      this.eleveService.getSingleEleve(this.eleve_id).subscribe(
        (response: any) => {
          if (response.success && response.data) {
            this.editForm.patchValue({
              id_eleve: response.data.id_eleve,
              nom: response.data.nom,
              prenom: response.data.prenom,
              date_naissance: response.data.date_naissance,
              adresse: response.data.adresse,
              date_inscription: response.data.date_inscription,
              npeh: response.data.npeh,
              identifiant: response.data.identifiant,
              mot_de_passe: response.data.mot_de_passe,
              genre: response.data.genre,
              id_autoecole: response.data.id_autoecole
            });
          } else {
            alert('Aucun élève trouvé avec cet ID.');
          }
        },
        error => {
          console.error('Erreur lors du chargement des données de l\'élève', error);
          alert('Erreur lors du chargement des données de l\'élève');
        }
      );
    }
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

  // Méthode pour soumettre le formulaire de modification
  onEdit(): void {
    if (this.editForm.valid) {
      const updatedEleve: Eleve = this.editForm.value;
      this.eleveService.editEleve(updatedEleve).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/']); 
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