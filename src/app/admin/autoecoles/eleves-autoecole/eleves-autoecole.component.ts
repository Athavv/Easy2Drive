import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../../services/eleve.service';
import { AutoecoleService } from '../../../services/autoecole.service';
import { Eleve } from '../../../modules/eleves';
import { Autoecole } from '../../../modules/autoecoles';
import { AvisService } from '../../../services/avis.service';

@Component({
  selector: 'app-eleves-autoecole',
  standalone: false,
  templateUrl: './eleves-autoecole.component.html',
  styleUrls: ['./eleves-autoecole.component.css']
})
export class ElevesAutoecoleComponent implements OnInit {
  eleves: Eleve[] = [];
  autoecole: Autoecole | null = null;
  autoecole_id: number;
  
  // Propriétés pour la pagination des élèves
  currentElevePage: number = 1;
  elevesPerPage: number = 10;
  totalEleves: number = 0;
  totalElevePages: number = 0;
  
  // Propriétés pour la gestion des avis
  avisList: any[] = [];
  currentAvisPage: number = 1;
  avisPerPage: number = 3;
  totalAvis: number = 0;
  totalAvisPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private eleveService: EleveService,
    private autoecoleService: AutoecoleService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.autoecole_id = +this.route.snapshot.params['id'];
    this.loadAutoecoleInfo(this.autoecole_id);
    this.loadElevesByAutoecole(this.autoecole_id);
    this.loadAllAvisByAutoecole(this.autoecole_id);
  }

  loadAutoecoleInfo(id: number): void {
    this.autoecoleService.getSingleAutoecole(id).subscribe(
      (result: any) => {
        this.autoecole = result.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des informations de l'auto-école", error);
      }
    );
  }

  loadElevesByAutoecole(id: number): void {
    this.eleveService.getElevesByAutoecole(id).subscribe(
      (result: any) => {
        this.eleves = result.data;
        this.totalEleves = this.eleves.length;
        this.totalElevePages = Math.ceil(this.totalEleves / this.elevesPerPage);
      },
      (error) => {
        console.error("Erreur lors de la récupération des élèves", error);
      }
    );
  }

  getPaginatedEleves(): Eleve[] {
    const startIndex = (this.currentElevePage - 1) * this.elevesPerPage;
    return this.eleves.slice(startIndex, startIndex + this.elevesPerPage);
  }

  changeElevePage(page: number): void {
    if (page >= 1 && page <= this.totalElevePages) {
      this.currentElevePage = page;
    }
  }

  loadAllAvisByAutoecole(id: number): void {
    this.avisService.getAllAvisByAutoecole(id).subscribe(
      (response: any) => {
        this.avisList = response.data;
        this.totalAvis = this.avisList.length;
        this.totalAvisPages = Math.ceil(this.totalAvis / this.avisPerPage);
      },
      (error) => {
        console.error('Erreur lors du chargement des avis', error);
      }
    );
  }

  getPaginatedAvis(): any[] {
    const startIndex = (this.currentAvisPage - 1) * this.avisPerPage;
    return this.avisList.slice(startIndex, startIndex + this.avisPerPage);
  }

  changeAvisPage(page: number): void {
    if (page >= 1 && page <= this.totalAvisPages) {
      this.currentAvisPage = page;
    }
  }

  updateAvisStatut(avis: any): void {
    this.avisService.updateAvisStatut(avis.id_avis, avis.statut).subscribe(
      (response) => {
        console.log('Statut mis à jour', response);
      },
      (error) => {
        console.error('Erreur de mise à jour', error);
      }
    );
  }
}