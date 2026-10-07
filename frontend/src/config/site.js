/**
 * Personnalisation de l'Église : nom, slogan, bandeau défilant, annonce.
 * 👉 Modifiez librement ce fichier, la page d'accueil se met à jour toute seule.
 */
export const SITE = {
  nom: 'ICC GRENOBLE',
  sousTitre: 'Impact Centre Chrétien - Grenoble',
  nomApplication: 'My Church ICC App',
  logo: '/logo.svg',

  // Messages du bandeau défilant en haut de la page d'accueil
  bandeau: [
    '🙏 Grenoble pour Christ',
    '🎯 2026, Année du Discipolat',
    'Objectif <b>1000</b> Disciples affermis du Christ à Grenoble',
  ],

  // Petite annonce affichée en haut à droite (mettre null pour la masquer)
  // Affiche les comptes de démonstration sur la page de connexion (mettre false en production)
  afficherComptesDemo: true,

  annonce: "🎉 Retraite des jeunes d'ICC Grenoble, dans 2 jours",
};
