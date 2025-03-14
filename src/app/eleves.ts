export class Eleve {
  id_eleve: number;
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse?: string;
  date_inscription: string;
  npeh?: number;
  identifiant: string;
  mot_de_passe: string;
  genre: string;
  id_autoecole: number;

  constructor(
    id_eleve: number,
    nom: string,
    prenom: string,
    date_naissance: string,
    date_inscription: string,
    identifiant: string,
    mot_de_passe: string,
    genre: string,
    id_autoecole: number,
    adresse?: string,
    npeh?: number,
  ) {
    this.id_eleve = id_eleve;
    this.nom = nom;
    this.prenom = prenom;
    this.date_naissance = date_naissance;
    this.date_inscription = date_inscription;
    this.identifiant = identifiant;
    this.mot_de_passe = mot_de_passe;
    this.genre = genre;
    this.id_autoecole = id_autoecole;
    this.adresse = adresse;
    this.npeh = npeh;
  }
}
