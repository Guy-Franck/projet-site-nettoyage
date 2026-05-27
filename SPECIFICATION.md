# SPÉCIFICATIONS TECHNIQUES ET FONCTIONNELLES - INNOV'ÉCLAT CI

Ce document décrit les spécifications techniques, fonctionnelles et de design du nouveau site vitrine premium pour la société de nettoyage **Innov'Éclat CI** (https://www.innoveclat.ci/).

---

## 1. Objectif du Projet
Le projet consiste en la recréation complète du site vitrine d'Innov'Éclat CI. 
- **Objectif principal** : Positionner la marque comme le prestataire de nettoyage et d'entretien haut de gamme de référence en Côte d'Ivoire.
- **Objectifs secondaires** : Améliorer significativement le taux de conversion (demandes de devis/contact), moderniser l'image de marque, optimiser les performances de chargement, et offrir une expérience utilisateur (UX) fluide et engageante (UI) sur tous les terminaux (mobile, tablette, desktop).

---

## 2. Cible Utilisateur
Le site s'adresse à deux cibles principales :
1. **Les Particuliers** : Résidant en Côte d'Ivoire (Abidjan et environs), recherchant des services de nettoyage de fin de chantier, nettoyage de canapés/tapis, ou un entretien ménager régulier de haute qualité.
2. **Les Professionnels (B2B)** : Entreprises, bureaux, commerces, syndics de copropriété, et institutions recherchant un prestataire fiable et flexible pour l'entretien industriel, la dératisation/désinsectisation, et la gestion des déchets.

---

## 3. Identité Visuelle

La charte graphique est modernisée pour inspirer la propreté, la clarté et le professionnalisme :

### Palette de Couleurs
- **Couleur Primaire (Deep Blue)** : `#19207d` (et `#161b59` pour les variations sombres). Inspire la confiance, la rigueur et la structure.
- **Couleur Secondaire (Cyan Éclatant)** : `#35f0f5`. Représente l'eau, la pureté, la fraîcheur et la brillance (l'« éclat »).
- **Couleurs de Fond (Backgrounds)** :
  - *Mode Clair* : Blanc pur (`#ffffff`), Gris ultra-clair de transition (`#f8fafc`).
  - *Mode Sombre* : Gris ardoise très sombre (`#0b0f19`), Noir bleuté (`#05070c`).
- **Couleur de Texte** : Gris ardoise foncé (`#1e293b`) en mode clair, Gris très clair (`#f1f5f9`) en mode sombre.

### Typographie
- **Titres** : `Outfit` (sans-serif moderne, géométrique et élégante).
- **Corps de texte** : `Plus Jakarta Sans` (très lisible, épurée et professionnelle).

### Charte Iconographique et Localisation Visuelle (Côte d'Ivoire)
- **Localisation Visuelle** : Toutes les photographies clés du site mettent en scène des professionnels de la propreté noirs (agents ivoiriens) en uniformes professionnels bleus et cyans d'Innov'Éclat CI.
- **Contextes Locaux** : Les arrière-plans représentent des environnements ivoiriens emblématiques d'Abidjan et alentours (villas de Cocody, bureaux d'affaires du Plateau, commerces de Marcory Zone 4, logistique à San Pédro et écoles à Yamoussoukro) pour inspirer confiance et proximité géographique immédiate.

---

## 4. Architecture Technique

La stack technique est optimisée pour la rapidité et la maintenabilité :
- **Langages de base** : HTML5 sémantique et CSS3.
- **Framework CSS** : TailwindCSS (via le Play CDN officiel avec configuration étendue pour un prototypage de qualité production).
- **JavaScript** : JS Vanilla (ES6+) structuré, modulaire et sans dépendance externe lourde.
- **Icônes** : FontAwesome 6 (via CDN sécurisé) et icônes SVG Inline pour les éléments clés.
- **Typographies** : Importations Google Fonts sécurisées.

---

## 5. Fonctionnalités JavaScript

- **Navbar Sticky & Glassmorphism** : La barre de navigation s'adapte au défilement (réduction de taille, floutage d'arrière-plan `backdrop-filter: blur()`).
- **Menu Mobile Réactif (Drawer)** : Menu latéral coulissant optimisé pour le tactile, avec gestion de l'accessibilité.
- **Bouton Light / Dark Mode** : Basculement instantané entre thème clair et sombre avec mémorisation locale (`localStorage`).
- **Animations au Défilement (Scroll Animations)** : Utilisation de l'API `IntersectionObserver` pour animer l'apparition des sections (fade-in, slide-up) sans impacter les performances de rendu.
- **Compteurs Animés** : Les chiffres des statistiques augmentent de manière fluide dès que la section correspondante entre dans le champ de vision de l'utilisateur.
- **Comparateur d'Images Avant/Après** : Widget interactif en pur JS permettant de faire glisser un curseur horizontal pour comparer la propreté d'un espace avant et après l'intervention d'Innov'Éclat CI.
- **Carrousel de Témoignages** : Curseur coulissant automatique et tactile, avec une durée d'affichage volontairement plus longue (15s) et un indicateur actif distinct (point mis en évidence).
- **Watermark du logo sur images** : Ajout automatique d'un watermark `logo.png` sur la majorité des images (hors favicon/logo) pour renforcer l'identité de marque.
- **Bouton Retour en haut** : Apparition progressive après un scroll de 400px.

---

## 6. Choix d'Expérience Utilisateur (UX/UI)

1. **Effet Glassmorphism Léger** : Appliqué sur les cartes et la barre de navigation pour donner une esthétique moderne type "SaaS/Startup".
2. **Hiérarchie Visuelle Forte** : Des titres imposants et des sections très aérées (marges généreuses `py-20` et `py-24`) pour éviter la surcharge cognitive.
3. **Appels à l'action (CTA) clairs** : Présence de boutons d'action de couleur contrastée (cyan sur fond bleu) placés stratégiquement sur toutes les pages.
4. **Formulaire de contact dynamique** : Validation en temps réel et rétroaction claire après envoi (fausse simulation de requête API).
