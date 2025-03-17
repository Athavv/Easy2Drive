export class Autoecole {
    id_autoecole!: number;
    nom!: string;
    adresse!: string;
    telephone!: string;
    identifiant!: string;
    mot_de_passe!: string;
  
    constructor(
      id_autoecole: number,
      nom: string,
      adresse: string,
      telephone: string,
      identifiant: string,
      mot_de_passe: string
    ) {
      this.id_autoecole = id_autoecole;
      this.nom = nom;
      this.adresse = adresse;
      this.telephone = telephone;
      this.identifiant = identifiant;
      this.mot_de_passe = mot_de_passe;
    }
  }