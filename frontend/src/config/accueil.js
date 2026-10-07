/**
 * Contenu de la page d'accueil publique : modules, parcours, avantages, accès directs.
 * 👉 Pour modifier un texte, un lien ou une couleur, c'est ici.
 *    Icônes : https://lucide.dev/icons (à importer en haut du fichier).
 *    Couleurs : une des clés de COULEURS ci-dessous.
 */
import {
  BarChart3, BookOpenText, CalendarDays, Church, Handshake, Megaphone, Shield, ShieldCheck, Sparkles, Star, Users,
} from 'lucide-react';

// Palette des modules (classes Tailwind)
export const COULEURS = {
  vert: { fond: 'bg-emerald-600', doux: 'bg-emerald-50', texte: 'text-emerald-700', bord: 'border-emerald-200' },
  bleu: { fond: 'bg-blue-600', doux: 'bg-blue-50', texte: 'text-blue-700', bord: 'border-blue-200' },
  violet: { fond: 'bg-violet-600', doux: 'bg-violet-50', texte: 'text-violet-700', bord: 'border-violet-200' },
  jaune: { fond: 'bg-amber-500', doux: 'bg-amber-50', texte: 'text-amber-700', bord: 'border-amber-200' },
  orange: { fond: 'bg-orange-500', doux: 'bg-orange-50', texte: 'text-orange-700', bord: 'border-orange-200' },
  cyan: { fond: 'bg-sky-600', doux: 'bg-sky-50', texte: 'text-sky-700', bord: 'border-sky-200' },
  rouge: { fond: 'bg-rose-600', doux: 'bg-rose-50', texte: 'text-rose-700', bord: 'border-rose-200' },
  marine: { fond: 'bg-[#0f1f4b]', doux: 'bg-slate-100', texte: 'text-[#0f1f4b]', bord: 'border-slate-300' },
};

// Les 6 espaces reliés à la base unique
export const MODULES = [
  { titre: 'Évangélisation', icone: Megaphone, couleur: 'vert', lien: '/evangelisation',
    points: ['Enregistrement des nouveaux convertis', 'Phoning des nouveaux convertis', 'Suivi personnalisé', 'Historique des actions'] },
  { titre: 'Accueil & Intégration', icone: Handshake, couleur: 'bleu', lien: '/accueil',
    points: ['Nouveaux arrivants', "Informations d'intégration", 'Suivi des nouveaux', 'Affectation initiale'] },
  { titre: 'Discipolat', icone: BookOpenText, couleur: 'violet', lien: '/discipolat',
    points: ['Parcours de disciple', 'Modules / Promotions', 'Suivi des étapes', 'Mentorat'] },
  { titre: "Familles d'Impact", icone: Users, couleur: 'orange', lien: '/familles',
    points: ['Affectation dans une FI', 'Suivi des membres', 'Responsables & leaders', 'Réunions & activités'] },
  { titre: 'Statistiques', icone: BarChart3, couleur: 'cyan', lien: '/statistiques',
    points: ["Base de données de l'Église (MR, MF, ni MR ni MF)", 'Personnes reçues et de passage', 'Effectifs des cultes'] },
  { titre: 'Autres départements', icone: CalendarDays, couleur: 'rouge', lien: '/services',
    points: ['STARS (suivi & bien-être)', 'Juniors', "Agenda de l'Église", 'Services et ministères'] },
];

// Ce que contient la fiche unique d'un fidèle
export const FICHE = [
  'Identité', 'Coordonnées', 'Église / Campus', 'Statut spirituel',
  'Historique & parcours', 'Affectations', 'Participation', 'Notes & suivi',
];

// Parcours d'une personne dans l'Église
export const PARCOURS = [
  { titre: 'Évangélisation', texte: 'La personne est rencontrée', icone: Megaphone, couleur: 'vert' },
  { titre: 'Accueil & Intégration', texte: 'La personne est accueillie et suivie', icone: Handshake, couleur: 'bleu' },
  { titre: 'Discipolat', texte: 'La personne suit son parcours de disciple', icone: BookOpenText, couleur: 'violet' },
  { titre: 'Famille de disciple', texte: 'La personne est intégrée dans une famille', icone: Users, couleur: 'jaune' },
  { titre: "Famille d'Impact", texte: 'La personne sert et grandit en communauté', icone: Sparkles, couleur: 'orange' },
  { titre: 'Membre actif', texte: "La personne s'implique et devient leader", icone: Church, couleur: 'marine' },
];

export const AVANTAGES = [
  'Aucune duplication des données',
  'Source unique de vérité',
  'Suivi global et personnalisé',
  'Meilleure coordination entre départements',
  'Vision 360° du fidèle',
];

// Accès directs (pour les responsables)
export const ACCES_DIRECTS = [
  { titre: 'Tableau de bord Pasteur', icone: Shield, lien: '/tableau-de-bord' },
  { titre: "Bergers d'Église", icone: ShieldCheck, lien: '/fideles' },
  { titre: 'MPI · Prière', icone: BookOpenText, lien: '/services/mpi' },
  { titre: 'Ministère des STARS', icone: Star, lien: '/services/stars' },
  { titre: 'Juniors', icone: Users, lien: '/services/juniors' },
  { titre: 'Agenda', icone: CalendarDays, lien: '/agenda' },
];
