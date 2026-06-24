# SPÉCIFICATIONS TECHNIQUES ET FONCTIONNELLES — INNOV-ÉCLAT CI

Ce document décrit les spécifications techniques, fonctionnelles et de design du site vitrine premium de la société de nettoyage **Innov-Éclat CI** (https://www.innoveclat.ci/).

---

## 1. Objectif du Projet

Le projet consiste en la création complète du site vitrine d'Innov-Éclat CI.

- **Objectif principal** : Positionner la marque comme le prestataire de nettoyage et d'entretien haut de gamme de référence en Côte d'Ivoire.
- **Objectifs secondaires** : Améliorer le taux de conversion (demandes de devis / contact), moderniser l'image de marque, optimiser les performances de chargement, et offrir une expérience utilisateur (UX) fluide et engageante sur tous les terminaux (mobile, tablette, desktop).

---

## 2. Cible Utilisateur

Le site s'adresse à deux cibles principales :

1. **Les Particuliers** : Résidant en Côte d'Ivoire (Abidjan et environs), recherchant des services de nettoyage de fin de chantier, nettoyage de canapés/tapis, ou un entretien ménager régulier de haute qualité.
2. **Les Professionnels (B2B)** : Entreprises, bureaux, commerces, syndics de copropriété et institutions recherchant un prestataire fiable pour l'entretien industriel, la dératisation/désinsectisation et la gestion des déchets.

---

## 3. Identité Visuelle

La charte graphique est conçue pour inspirer la propreté, la clarté et le professionnalisme.

### Nom de Marque
**Innov-Éclat CI** (avec trait d'union). À utiliser de façon cohérente dans tout le projet.

### Palette de Couleurs

| Rôle | Valeur | Description |
|------|--------|-------------|
| **Primaire (Deep Blue)** | `#2933b1` (500) | Confiance, rigueur, structure |
| **Primaire sombre** | `#202a8f` (600) | Variation foncée pour hover/état actif |
| **Secondaire (Cyan Éclatant)** | `#35f0f5` (400) | Eau, pureté, fraîcheur, l'« éclat » |
| **Fond Sombre** | `#05070c` (ink-950) | Noir bleuté profond (mode sombre) |
| **Fond Intermédiaire** | `#0b0f19` (ink-900) | Gris ardoise sombre (mode sombre) |
| **Fond Clair** | `#f8fafc` (slate-50) | Mode clair principal |
| **Texte Clair** | `#f1f5f9` | Texte principal en mode sombre |
| **Texte Sombre** | `#1e293b` | Texte principal en mode clair |

Ces couleurs sont définies :
- En tant que **variables CSS** dans `assets/css/style.css` (`:root` et `html.dark`).
- En tant que **palette Tailwind étendue** dans la configuration JS de chaque page HTML (`tailwind.config`).

### Typographie

- **Titres** (`font-display`) : `Outfit` — sans-serif moderne, géométrique et élégante.
- **Corps de texte** (`font-sans`) : `Plus Jakarta Sans` — très lisible, épurée et professionnelle.
- Chargement via Google Fonts (déclarations `<link>` dans chaque `<head>`).

### Charte Iconographique et Localisation Visuelle (Côte d'Ivoire)

- **Localisation Visuelle** : Toutes les photographies clés du site mettent en scène des professionnels de la propreté (agents ivoiriens) en uniformes professionnels bleus et cyans d'Innov-Éclat CI.
- **Contextes Locaux** : Villas de Cocody, bureaux du Plateau, commerces de Marcory Zone 4, logistique à San Pédro, écoles à Yamoussoukro — pour inspirer confiance et proximité géographique.

---

## 4. Architecture Technique

### Stack

| Composant | Technologie |
|-----------|-------------|
| Structure | HTML5 sémantique |
| Style | TailwindCSS (Play CDN + config étendue) + CSS3 personnalisé |
| JavaScript | Vanilla JS ES6+ (aucune dépendance externe lourde) |
| Icônes | FontAwesome 6.4 (CDN) |
| Typographies | Google Fonts (Outfit + Plus Jakarta Sans) |
| Formulaire | FormSubmit.co (AJAX sans back-end) |
| Thème | Double thème Clair/Sombre via `localStorage` |

### Pages du Site

| Fichier | Titre | Description |
|---------|-------|-------------|
| `index.html` | Accueil | Hero, vidéo, services, stats, témoignages, contact rapide |
| `about.html` | À propos | Histoire, mission, vision, valeurs, équipe |
| `services.html` | Services | 8 prestations détaillées |
| `contact.html` | Contact | Formulaire de devis + coordonnées |
| `maintenance.html` | En cours de rédaction | Page d'attente pour les liens légaux (pied de page) |
| `robots.txt` | Directives robots | Fichier d'instructions pour les moteurs de recherche |
| `sitemap.xml` | Plan du site XML | Fichier d'indexation pour les moteurs de recherche |

### Assets

| Répertoire | Contenu |
|-----------|---------|
| `assets/images/` | `nouveau_logo.png`, `hero1-4.jpg`, `about.jpg`, `presentation.jpg`, `presentation1.jpg`, `service1-8.jpg`, `sofa_before.jpg`, `sofa_after.jpg` |
| `assets/videos/` | `1v.mp4` (vidéo cinématique de présentation) |
| `assets/css/` | `style.css` (styles personnalisés et double thème - avec nettoyage du code mort `.reveal-zoom`) |
| `assets/js/` | `main.js` (toutes les interactions JS du site) |

---

## 5. Fonctionnalités JavaScript (`assets/js/main.js`)

Les fonctionnalités sont numérotées selon leur ordre de déclaration dans `main.js` :

| N° | Fonctionnalité | Description |
|----|----------------|-------------|
| 0 | Watermark (désactivé) | Commenté — les images restent sans watermark. |
| 1 | **Page Loader** | Écran de chargement animé (logo + spinner). Masqué à l'événement `load` avec fallback à 2s. |
| 2 | **Sticky Navbar** | Classe `.scrolled` ajoutée après 50px de défilement (fond glassmorphique + ombre). |
| 3 | **Menu Mobile Drawer** | Panneau coulissant depuis la droite. Fermé par le bouton ×, liens de nav, ou clic extérieur. |
| 4 | **Slider Hero** | Rotation automatique des 4 images `.hero-slide` toutes les 5 secondes (fondu). |
| 5 | **Scroll Reveal** | `IntersectionObserver` pour `.reveal`, `.reveal-left`, `.reveal-right`. Fallback immédiat. (La classe `.reveal-zoom` a été nettoyée). |
| 6 | **Compteurs Animés** | Incrémentation fluide des `.stats-counter` (attribut `data-target`) sur 2 secondes. |
| 7 | **Comparateur Avant/Après** | Glisser-déposer souris + tactile (`clip-path` dynamique) sur `.before-after-container`. |
| 8 | **Carrousel Témoignages** | Autoplay 7s, navigation manuelle, points indicateurs, pause au survol, et **gestion tactile (swipe mobile)**. |
| 9 | **Bouton Retour en Haut** | Visible après 400px de défilement, action `scrollTo({ top: 0, behavior: 'smooth' })`. |
| 10 | **Formulaire FormSubmit** | Envoi AJAX vers `infos@innoveclat.ci`. Validation HTML5, spinner, alertes succès/erreur. ⚠️ Activation requise sur la boîte mail. |
| 11 | **Dock Flottant (macOS)** | Barre glassmorphique (tél., WhatsApp, email, réseaux sociaux). Apparaît après 300px, disparaît après 3s d'inactivité, pause au survol, fermable via bouton ×. |
| 12 | **Section Vidéo** | Autoplay muet de `1v.mp4`. Overlay de lecture interactif. Bouton Mute/Unmute (volume 40% à l'activation). |
| 13 | **Gestion du Thème** | Bascule `.dark` sur `<html>`, persistance `localStorage` (`innoveclat-theme`). Synchronisation des icônes soleil/lune sur tous les boutons de la page. |

### Script Anti-Flash (inline dans chaque `<head>`)

Un script IIFE est inclus dans le `<head>` de chaque page **avant** le chargement du CSS pour appliquer la classe `.dark` immédiatement si le thème sombre est mémorisé, et ainsi éviter un flash de contenu en mode clair.

---

## 6. SEO et Métadonnées

Chaque page inclut :
- `<title>` et `<meta name="description">` uniques et descriptifs.
- `<meta name="keywords">` et `<meta name="author">`.
- `<link rel="canonical">` avec URL absolue vers `https://www.innoveclat.ci/`.
- Balises **Open Graph** (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`).
- `og:image` absolu : `https://www.innoveclat.ci/assets/images/nouveau_logo.png`.
- Favicon : `nouveau_logo.png`.
- Fichiers **`sitemap.xml`** et **`robots.txt`** configurés et déployés à la racine du projet.

---

## 7. Contacts et Réseaux Sociaux

| Canal | Valeur |
|-------|--------|
| **Email** | `infos@innoveclat.ci` |
| **Téléphone / WhatsApp** | `+225 07 14 40 22 02` |
| **Facebook** | https://www.facebook.com/share/17d6MAAAk8/ |
| **Instagram** | https://www.instagram.com/innov_eclat/ |
| **LinkedIn** | https://www.linkedin.com/in/innov-%C3%A9clat-29b2a13a5/ |
| **TikTok** | https://www.tiktok.com/@innoveclat2 |

Tous les liens `target="_blank"` portent l'attribut `rel="noopener noreferrer"` pour la sécurité.

---

## 8. Améliorations Futures

- **Rédaction des pages légales** : Finaliser le contenu de "Politique de confidentialité" et "Mentions légales" pour remplacer la redirection vers `maintenance.html`.
- **Intégration d'un CMS** : Rendre le contenu administrable sans modification de code.
- **Estimateur de devis interactif** : Calculateur JS en temps réel selon la surface et le type de prestation.
- **Système de rendez-vous en ligne** : Calendrier de réservation dynamique intégré.