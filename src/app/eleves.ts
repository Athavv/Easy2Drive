export class Eleve {
  id_eleve: number;
  nom: string;
  prenom: string;
  email?: string;
  adresse?: string;
  id_autoecole: number;

  constructor(id_eleve: number, nom: string, prenom: string, id_autoecole: number, email?: string, adresse?: string) {
    this.id_eleve = id_eleve;
    this.nom = nom;
    this.prenom = prenom;
    this.id_autoecole = id_autoecole;
    this.email = email;
    this.adresse = adresse;
  }
}
