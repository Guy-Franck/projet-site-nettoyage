# Innov-Éclat CI — Site Vitrine Haut de Gamme

Bienvenue sur le dépôt du site vitrine premium d'**Innov-Éclat CI** (https://www.innoveclat.ci/).  
Ce site moderne a été entièrement conçu pour offrir une expérience utilisateur haut de gamme, interactive et pleinement responsive sur tous les terminaux.

Une attention particulière a été apportée à la **localisation iconographique ivoirienne** : toutes les illustrations clés (bannières de la page d'accueil et cartes de services) représentent des professionnels ivoiriens (personnes noires) en uniformes bleus et cyans d'Innov-Éclat CI, opérant au sein de décors et d'environnements locaux d'Abidjan (Cocody, Plateau, Marcory Zone 4) et d'autres grandes villes (Yamoussoukro, San Pédro, Assinie).

---

## Stack Technique
- **Structure** : HTML5 sémantique (5 pages).
- **Styling** : TailwindCSS (via CDN Play + configuration étendue) + CSS3 personnalisé (`assets/css/style.css`).
- **Interactions** : JavaScript Vanilla ES6+ (`assets/js/main.js`).
- **Polices** : Google Fonts — `Outfit` (titres) & `Plus Jakarta Sans` (texte courant).
- **Icônes** : FontAwesome 6.4 (CDN).
- **Formulaire** : Soumission sans back-end via **FormSubmit.co** (AJAX) → `infos@innoveclat.ci`.
- **Thème** : Double thème Clair / Sombre persistant via `localStorage` (`innoveclat-theme`).

---

## Structure des Dossiers
```
/assets/
  /images/         # Images des services, arrière-plans, et logo (nouveau_logo.png)
                   # about.jpg, hero1-4.jpg, presentation.jpg, presentation1.jpg
                   # service1-8.jpg, sofa_before.jpg, sofa_after.jpg
  /videos/
    1v.mp4         # Vidéo cinématique de présentation (section showcase)
  /js/
    main.js        # Script JS principal : loader, navbar, menu, slider hero,
                   # scroll-reveal, compteurs, avant/après, carrousel,
                   # back-to-top, formulaire FormSubmit, dock flottant,
                   # vidéo showcase, gestion du thème clair/sombre
  /css/
    style.css      # Variables CSS, double thème, glassmorphism, animations,
                   # navbar sticky, comparateur avant/après, loader, responsive (suppression code mort)
/index.html        # Page d'accueil (Hero, Présentation rapide, Vidéo, Services, Stats, Témoignages, Contact)
/about.html        # Page À propos (Histoire, Mission, Vision, Valeurs, Équipe)
/services.html     # Page Services détaillés (8 prestations)
/contact.html      # Page Contact (formulaire de devis + coordonnées)
/maintenance.html  # Page d'attente pour "Politique de confidentialité" et "Mentions légales"
/robots.txt        # Fichier d'instructions pour les moteurs de recherche (SEO)
/sitemap.xml       # Plan du site XML pour l'indexation Google (SEO)
/README.md         # Présentation et instructions de déploiement
/SPECIFICATION.md  # Spécifications fonctionnelles et techniques
```

---

## Fonctionnalités Majeures

1. **Double Thème Clair / Sombre** : Bascule persistante via `localStorage`. Un script anti-flash dans chaque `<head>` applique le thème sauvegardé avant le premier rendu pour éviter tout scintillement. Le bouton de bascule est présent dans la navbar (desktop) et le menu mobile.
2. **Chargeur de Page (Page Loader)** : Écran de chargement animé avec logo et spinner. Masqué automatiquement à l'événement `load` (avec fallback à 2 secondes).
3. **Sticky Header Blur** : Barre de navigation adaptative — fond glassmorphique et ombre activés au défilement (> 50px). Comportement différencié selon le thème actif.
4. **Menu Mobile Drawer** : Panneau coulissant latéral (droite) optimisé pour le tactile, fermable par clic extérieur ou sur les liens de navigation.
5. **Slider Hero Automatique** : Rotation automatique des 4 images d'arrière-plan du Hero toutes les 5 secondes avec transition de fondu.
6. **Animations au Défilement (Scroll Reveal)** : Apparition des sections via `IntersectionObserver` (`.reveal`, `.reveal-left`, `.reveal-right`). Fallback immédiat si l'API n'est pas disponible. (La classe de code mort `.reveal-zoom` a été nettoyée).
7. **Compteurs de Statistiques Animés** : Les chiffres s'incrémentent de manière fluide dès l'entrée dans le champ de vision (`.stats-counter`, attribut `data-target`).
8. **Curseur Avant/Après Interactif** : Comparateur glisser-déposer (souris + tactile) pour visualiser la qualité du nettoyage avant/après intervention (`sofa_before.jpg` / `sofa_after.jpg`).
9. **Carrousel de Témoignages** : Défilement automatique (7 secondes), navigation manuelle (boutons + points), pause au survol, indicateur de slide actif distinct, et **swipe mobile tactile** (événements touchstart/touchend).
10. **Bouton Retour en Haut** : Apparaît après 400px de défilement, lisse et animé.
11. **Formulaire de Contact sans back-end** : Envoi AJAX via FormSubmit.co vers `infos@innoveclat.ci`. Validation HTML5 côté client, spinner de chargement, alertes de succès et d'erreur intégrées. ⚠️ Activation requise : FormSubmit envoie un e-mail de confirmation à `infos@innoveclat.ci` lors du tout premier envoi ; ce lien doit être cliqué pour activer la réception.
12. **Dock de Contact Flottant (macOS Style)** : Barre glassmorphique flottante (téléphone, WhatsApp, email, Instagram, Facebook, TikTok). Apparaît après 300px de défilement, disparaît automatiquement après 3 secondes d'inactivité de scroll (pause au survol), fermable définitivement via le bouton ×.
13. **Section Vidéo Cinématique** : Lecture de `assets/videos/1v.mp4` en autoplay (muet par défaut), avec overlay interactif et bouton Mute/Unmute.
14. **Page Maintenance** : Page d'attente élégante et alignée sur l'identité visuelle pour les liens légaux non encore rédigés.
15. **Optimisation SEO** : Fichiers `sitemap.xml` et `robots.txt` présents à la racine pour guider le référencement naturel.

---

## Installation et Lancement Local

Le site est développé en technologies web statiques pures (HTML/CSS/JS). Aucun outil de construction n'est requis.

### Option 1 : Double-clic
Ouvrez directement `index.html` dans un navigateur moderne (Chrome, Firefox, Edge, Safari).

### Option 2 : Serveur local léger (Recommandé)
Pour un rendu optimal et éviter d'éventuelles restrictions CORS lors du chargement de ressources :

**Avec Node.js** :
```bash
npx http-server ./
```

**Avec Python** :
```bash
python -m http.server 8000
```
Accédez ensuite à `http://localhost:8000`.

---

## Responsive Design
Le site est entièrement adaptatif grâce aux utilitaires Tailwind (Grid, Flexbox) et aux media queries personnalisées dans `style.css` :
- **Mobile** : smartphones dès 320px de large.
- **Tablette** : iPad et équivalents Android.
- **Desktop** : ordinateurs portables, écrans standard et ultra-larges.

Le dock flottant est repositionné sur mobile pour ne pas masquer le bouton Retour en haut. Les réseaux sociaux du dock sont masqués sur les très petits écrans pour préserver la lisibilité.

---

## Améliorations Futures
- **Intégration d'un CMS** : Rendre le contenu administrable sans modification de code.
- **Estimateur de devis interactif** : Calculateur JS en temps réel selon la surface et le type de service.
- **Système de rendez-vous en ligne** : Intégration d'un calendrier de réservation dynamique.
- **Rédaction des pages légales** : Finaliser les contenus de "Politique de confidentialité" et "Mentions légales" pour remplacer la page `maintenance.html`.
