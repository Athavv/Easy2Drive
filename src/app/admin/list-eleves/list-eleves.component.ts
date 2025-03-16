import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../services/eleve.service';


@Component({
  selector: 'app-list-eleves',
  standalone: false,
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: any[] = [];

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.eleveService.getEleves().subscribe(
      (result: any) => {
        this.eleves = result.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des élèves", error);
      }
    );
  }


  deleteEleve(eleve:any){
    // console.log(id);
     this.eleveService.deleteEleve(eleve.id_eleve).subscribe(data=>{
       this.eleves = this.eleves.filter((u: any) => u !== eleve);
     })
   }
}