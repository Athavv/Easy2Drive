export interface Avis {
    id_avis: number;
    id_eleve: number;
    commentaire: string;
    date_commentaire: string; // ou Date si vous préférez
    statut: 'En attente' | 'Publié' | 'Refusé';
  }