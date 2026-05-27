# Innov'Éclat CI - Site Vitrine Haut de Gamme

Bienvenue sur le projet de refonte du site vitrine d'**Innov'Éclat CI** (https://www.innoveclat.ci/). 
Cette version moderne a été entièrement repensée pour offrir une expérience utilisateur haut de gamme, premium et interactive.

Une attention particulière a été apportée à la **localisation iconographique ivoirienne** : toutes les illustrations clés (bannières de la page d'accueil et cartes de services) représentent des professionnels ivoiriens (personnes noires) en uniformes bleus et cyans d'Innov'Éclat CI, opérant au sein de décors et d'environnements locaux d'Abidjan (Cocody, Plateau, Marcory Zone 4) et d'autres grandes villes (Yamoussoukro, San Pédro, Assinie).

---

## 🚀 Stack Technique
- **Structure** : HTML5 sémantique.
- **Styling** : TailwindCSS (via CDN) + CSS3 personnalisé.
- **Interactions** : JavaScript Vanilla (ES6).
- **Polices** : Google Fonts (`Outfit` & `Plus Jakarta Sans`).
- **Icônes** : FontAwesome 6 (CDN).

---

## 📂 Structure des Dossiers
```
/assets/
  /images/      # Images des services, arrière-plans, logos et favicons
  /videos/      # Fichiers vidéos et médias
  /js/
    /main.js    # Script d'interactions et d'animations (ES6)
  /css/
    /style.css  # Styles CSS personnalisés et configurations de thèmes
/index.html     # Page d'accueil interactive
/about.html     # Page de présentation de l'entreprise
/services.html  # Page des services détaillés (8 services)
/contact.html   # Formulaire de contact et coordonnées
/README.md      # Présentation et instructions de déploiement
/SPECIFICATION.md # Spécifications fonctionnelles et UX
```

---

## 🌟 Fonctionnalités Majeures
1. **Curseur Avant/Après Interactif** : Permet de comparer visuellement et de manière tactile la qualité du nettoyage d'un chantier (glisser-déposer en pur JavaScript).
2. **Sticky Header Blur** : Barre de navigation adaptative avec un effet de flou de fond (backdrop-filter) premium.
3. **Animations de défilement (Scroll Animations)** : Sections apparaissant avec un effet de fondu et de glissement élégant lorsque l'utilisateur y accède (Intersection Observer API).
4. **Statistiques en Temps Réel** : Chiffres de statistiques qui s'incrémentent dynamiquement de façon animée lorsque visibles.
5. **Mode Sombre / Clair persistant** : Option intégrée permettant de changer de thème visuel en un clic, avec mémoire locale.
6. **Formulaire de contact haut de gamme** : Validation complète côté client avec gestion visuelle d'envoi.
7. **Carrousel de témoignages lisible** : Point actif mis en évidence + délai augmenté (15s) pour laisser le temps de lire.
8. **Branding cohérent** : Lien Instagram officiel intégré sur toutes les pages + watermark automatique du logo Innov'Éclat sur les images du site.

---

## ⚙️ Installation et Lancement local

Le site étant développé en technologies web statiques pures (HTML/CSS/JS), il ne requiert aucun outil de construction lourd.

### Option 1 : Double-clic
Vous pouvez simplement ouvrir le fichier `index.html` dans n'importe quel navigateur web moderne.

### Option 2 : Serveur local léger (Recommandé pour l'Intersection Observer)
Pour un rendu optimal et éviter d'éventuelles restrictions de sécurité CORS liées au chargement de scripts, lancez un serveur local léger :

**Avec Node.js** :
```bash
npx http-server ./
```

**Avec Python** :
```bash
python -m http.server 8000
```
Ouvrez ensuite `http://localhost:8000` (ou le port affiché dans le terminal).

---

## 📱 Responsive Design
Le site utilise pleinement les fonctionnalités de grille de Tailwind (CSS Grid) et Flexbox pour offrir une adaptabilité totale sur :
- Les smartphones (écrans compacts de 320px et plus)
- Les tablettes (iPad et Android)
- Les écrans d'ordinateurs portables et de bureau standard ou ultra-larges.

---

## 🔮 Améliorations futures
- **Intégration d'un CMS** : Rendre le contenu du site administrable sans modification de code.
- **Estimation de devis en direct** : Un calculateur interactif en JS permettant d'estimer en temps réel le coût d'une prestation selon la surface et le type de service choisi.
- **Système de prise de rendez-vous en ligne** : Intégration d'un calendrier de réservation dynamique.
