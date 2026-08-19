
# PROJET : OMEN SHOP

## Contexte général
Site e-commerce catalogue (pas de paiement en ligne — commande finalisée via
WhatsApp). Un seul projet **React + Vite** (PAS Next.js) avec **react-router-dom**
pour le routing, qui regroupe 3 univers de produits, chacun avec sa propre
identité visuelle mais un même gabarit de navigation.

Stack confirmée : React + Vite, react-router-dom, Tailwind CSS, framer-motion,
lucide-react. Ne jamais proposer ou basculer vers Next.js, App Router, ou
`next/font` — ce projet n'utilise pas Next.js.

## Structure des dossiers
```
src/
  main.jsx / App.jsx      → point d'entrée, définit les <Routes>
  pages/
    Home.jsx               → homepage (3 tuiles de navigation)
    Mode.jsx                → grille/carousel catégorie mode
    Electronique.jsx        → idem électronique
    Bienetre.jsx             → idem bien-être
    ProductDetail.jsx        → fiche produit (route /mode/:id etc.)
  components/               → composants partagés (cards, nav, AmbientBackground, VideoBackground...)
  data/                      → données produits (fichier JS/JSON, avant migration vers un vrai backend)
public/
  videos/                    → vidéos de fond compressées (.mp4, H.264, 720p max)
```

Avant de créer un fichier qui importe un autre composant/module, VÉRIFIE que
ce fichier existe déjà. Si non, crée-le d'abord, dans son intégralité, avant
d'écrire le fichier qui l'importe. Ne jamais laisser un import pointer vers
un fichier inexistant — c'est la cause la plus fréquente de page blanche ou
d'erreur de build sur ce projet.

## Système de design — RÈGLES STRICTES

Aucune couleur Tailwind par défaut nulle part sur ce projet. Interdits :
`text-green-600`, `bg-blue-500`, `text-cyan-400`, et toute classe de couleur
générée automatiquement par Tailwind. Toutes les couleurs viennent des tokens
ci-dessous, appliquées en style inline, variables CSS, ou config Tailwind
personnalisée — jamais via les classes couleur par défaut.

Aucune police système (Inter, Arial, Roboto, police Tailwind par défaut).
Chaque section a ses polices définies plus bas, chargées via Google Fonts
(balise `<link>` dans `index.html`, PAS de `next/font` qui n'existe pas ici).

Le nom "OMEN SHOP" ne se traduit JAMAIS, sous aucune forme (ex: "Présage"
est interdit), peu importe la langue du reste du site.

### Palette commune (nav, footer, homepage)
- Fond : `#FAFAFA` (blanc cassé, jamais blanc pur, jamais noir)
- Encre : `#0A0A0A`
- Gris texte secondaire : `#8C8C8C`
- Ligne/bordure : `#E2E2E2`
- Accent global (CTA, badges) : `#FF3B1F`

### Section MODE (`/mode`)
- Fond : `#FAFAFA`, encre `#0A0A0A`
- Accent : `#FF3B1F` (rouge-signal)
- Display : Anton | Body : Manrope | Data/prix/pointures : IBM Plex Mono
- Ton animation : rapide, punchy

### Section BIEN-ÊTRE (`/bienetre`)
- Fond : `#F5F1EA` (crème doux), encre `#2B2621`
- Accent : `#7A8B5C` (vert sauge mat) — jamais un vert Tailwind générique
- Display : Fraunces (poids 600, jamais 400 — trop fade) | Body : Manrope
- Pas de police mono dans cette section — casse le ton premium/doux
- Ton animation : lent, fluide, contemplatif — durées 2-3x plus longues que
  mode, easing "easeInOut" uniquement

### Section ÉLECTRONIQUE (`/electronique`)
- Fond : `#0A0A0A` (seule section en mode sombre), texte `#F5F5F5`
- Accent : `#00D4FF` (cyan électrique) — jamais un cyan Tailwind générique
- Tout en IBM Plex Mono, y compris les titres (identité "interface technique")
- Ton animation : précise, quasi mécanique

## Typographie — spécification technique

Charger les 4 polices une seule fois via `<link>` Google Fonts dans
`index.html` (Anton, Fraunces poids 400/500/600, Manrope poids 400/500/600/700,
IBM Plex Mono poids 400/500). Les rendre disponibles comme classes Tailwind
personnalisées (`font-anton`, `font-fraunces`, `font-manrope`, `font-mono`)
via `tailwind.config.js` (`fontFamily` étendu). Ne jamais charger une police
en dur dans un composant enfant, ne jamais laisser retomber sur `font-sans`
générique.

### Échelle de tailles (aucune valeur improvisée)
| Rôle | Taille | Poids | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (hero) | 44–56px | Anton=400, Fraunces=600 | 0.92–0.95 | normal |
| H2 (titre section) | 28–32px | idem | 1 | normal |
| Body | 14–15px | 400–500 (Manrope) | 1.5 | normal |
| Label/meta (majuscules) | 10–11px | 500–600 | 1.2 | 0.06–0.12em |
| Data/prix/mono | 13–20px | 400–500 (Plex Mono) | 1.2 | normal |

## Composants UI — règles strictes

### Cards produit — RÈGLE GÉNÉRALE (fiche produit, boutons, badges, blocs UI classiques)
- Bordure fine 1px (couleur de ligne de la section), angles droits — PAS de
  `border-radius`.
- PAS de `box-shadow` décoratif. Effet de profondeur au hover : léger
  `translateY`, jamais une ombre molle façon carte Bootstrap/Material.

### EXCEPTION — cards produit sur les pages d'accueil de catégorie (liquid glass)
Sur `/mode`, `/electronique`, `/bienetre` UNIQUEMENT, les cards produits de la
grille/carousel principal utilisent un traitement "liquid glass" (glassmorphism) :
- `background: rgba(255,255,255,0.10)` sur fond clair (mode, bien-être) ou
  `rgba(255,255,255,0.08)` sur fond sombre (électronique)
- `backdrop-filter: blur(16px)` (+ `-webkit-backdrop-filter` pour Safari)
- Bordure `1px solid rgba(255,255,255,0.25)` (semi-transparente, pas la
  bordure grise opaque utilisée ailleurs)
- `border-radius: 16px` — SEULE exception au "pas d'arrondi" du reste du site,
  car un glass effect a besoin de coins adoucis pour fonctionner visuellement
- Léger reflet/highlight en haut de la card possible (`linear-gradient` subtil
  blanc transparent sur les premiers ~30% de hauteur), optionnel
- Ces cards flottent au-dessus du fond animé de la section (vidéo ou
  AmbientBackground) — c'est ce fond qui donne la transparence sa texture
- Cette règle NE s'applique PAS à la fiche produit détaillée, aux boutons,
  aux badges de statut, ni à aucun autre composant — uniquement aux cards
  de la grille principale de chaque catégorie

### Placeholders visuels (tant que les vraies photos ne sont pas intégrées)
JAMAIS d'emoji comme visuel produit ou icône décorative, nulle part sur le
site. Utiliser un bloc de couleur uni `#F0F0F0` (gris clair, identique sur
tous les produits) avec le nom du produit en overlay typographique, ou une
silhouette SVG géométrique simple si disponible.

### Lisibilité sur fond vidéo/image
Tout texte posé sur une vidéo ou image de fond doit avoir un calque de
contraste dédié (dégradé `linear-gradient` en overlay absolute, contenu
strictement dans sa zone/section parente — ne doit jamais déborder sur le
reste de la page), indépendant du contenu visuel instantané du fond.

## Page fiche produit — layout de référence obligatoire
Route `/mode/:id` (et équivalent pour les autres catégories). Structure
exacte à respecter :
1. Header centré : "OMEN SHOP" en gros caractères condensés (Anton), petit
   trait horizontal accent en dessous, puis "DARE TO BE DIFFERENT" en
   italique gris petit, letter-spacing large
2. Grand visuel produit centré, fond blanc pur, sans cadre
3. Fine ligne horizontale grise sous le visuel
4. Petite barre verticale noire décorative à gauche du nom de marque, puis
   nom de marque en très gros (ex: "JORDAN"), puis description en gris juste
   en dessous
5. Rangée de cercles de couleur cliquables (une par variante produit) : au
   clic, le visuel et le nom de variante affichés se mettent à jour
6. Section "POINTURES DISPO" (label majuscules, letter-spacing, gris) :
   grille de pointures en cases carrées à bordure fine ; indisponibles =
   grisées/barrées, non cliquables
7. Badge rectangulaire à bordure fine avec un point de couleur (accent selon
   statut) suivi de "SUR COMMANDE" ou "DISPONIBLE" en majuscules
8. Bouton "Commander via WhatsApp" qui pré-remplit le message avec nom du
   produit + couleur + pointure sélectionnés

## Modèle de données produit
Chaque produit a : `id`, `category`, `brand`, `name`, `description`, `price`,
`colors` (array de `{ name, hex, image, sizes: [{ size, available }] }`),
`status` (`DISPONIBLE` | `SUR_COMMANDE` | `RUPTURE`). Toujours vérifier que
`colors` existe et n'est jamais `undefined` avant d'appeler `.find()`,
`.map()` ou toute méthode dessus — si le produit n'est pas trouvé via l'id
de l'URL, afficher un message "Produit introuvable", jamais planter.

## Homepage — 3 portes d'entrée
Hero avec titre fort + tagline courte, puis 3 tuiles côte à côte (une par
catégorie), numérotées 01/02/03. Au survol d'une tuile : un fond noir "monte"
depuis le bas (`height` animée en `%`), texte passe en blanc, CTA "EXPLORER"
prend la couleur accent de la section survolée. Chaque tuile a un fond ambiant
animé (vidéo ou fragments SVG) à très faible opacité (~5%).

## Vidéos de fond
Format `.mp4` (H.264), résolution 1280x720 max, compressées (CRF 28-30),
poids cible sous 5 Mo. Stockées dans `public/videos/`. Intégrées via balise
`<video>` HTML5 native (`autoPlay muted loop playsInline`, `object-cover`,
`pointer-events-none`) — jamais un iframe YouTube/Vimeo/Pinterest en fond de
site (droits d'usage non garantis, widget visible non désiré, poids inutile).

## Animations — règles non négociables
1. N'anime JAMAIS `width`, `height` (sauf le cas homepage décrit plus haut),
   `top/left`, `box-shadow` en continu. Prioritairement `transform` et
   `opacity` (GPU-friendly).
2. Grille de produits : reste rapide à scanner. Stagger léger au scroll
   (fade + translateY ~20px), rien de plus lourd.
3. Animations fortes (morph, transitions partagées, fonds ambiants) réservées
   au hero de page, aux transitions clic carte→fiche produit, aux fonds
   ambiants à faible opacité (8-12% max).
4. Respecte `prefers-reduced-motion`.

## Responsive — mobile-first, non négociable
La majorité des visiteurs seront sur téléphone. Le mobile n'est pas un cas à
gérer après coup — c'est la base par défaut, le desktop est l'ajustement.
- Construis chaque composant pour ~375-430px de large D'ABORD, puis ajoute
  les adaptations desktop via les breakpoints Tailwind (`sm:`, `md:`, `lg:`).
- Aucune largeur fixe en pixels qui dépasse la largeur d'écran. Utilise des
  unités relatives ou un conteneur à défilement horizontal contrôlé
  (`overflow-x-auto` + `scroll-snap` propre : `snap-x snap-mandatory` sur le
  conteneur, `snap-center` sur chaque card).
- Teste systématiquement en largeur ~375-430px avant de considérer un
  composant terminé.
- Zone de clic minimum 44px de hauteur pour tout élément interactif.

## Ce qu'il ne faut JAMAIS faire (résultats interdits)
- Ne jamais livrer une page qui affiche encore le template par défaut de
  Vite/React ("Vite + React", logo Vite/React).
- Ne jamais livrer un fichier qui importe un composant/module qui n'existe pas.
- Ne jamais mélanger guillemets classiques et expression JSX dans un
  `className` — toujours des backticks (template literal) dès qu'il y a une
  expression conditionnelle dedans.
- Ne jamais utiliser une classe de couleur Tailwind par défaut.
- Ne jamais écrire `package.json` à la main — toujours passer par
  `npm create vite@latest` / `npm install` pour gérer dépendances et scripts.
- Ne jamais créer de dossiers de routes/pages en dehors de `src/`.
- Ne jamais déclarer une tâche terminée sans avoir vérifié que le serveur dev
  ne montre aucune erreur dans le navigateur ET dans la console (F12).
- Ne jamais utiliser un emoji comme visuel produit ou icône.
- Ne jamais improviser une couleur "au feeling" — utiliser exactement les
  valeurs hexadécimales listées dans ce document.
- Ne jamais laisser un clic sur une card produit ne rien faire — vérifier que
  la navigation vers la fiche produit fonctionne réellement, pas supposer
  que c'est le cas.

## Avant de répondre "c'est fait"
Toujours vérifier et confirmer explicitement ces trois points :
1. Le fichier existe bien à l'emplacement attendu (liste le dossier pour
   confirmer, ne pas se fier à la mémoire de l'action précédente).
2. Tous les imports du fichier pointent vers des fichiers qui existent
   réellement.
3. La console du navigateur (F12) ne montre aucune erreur rouge après avoir
   testé l'interaction concernée (clic, navigation, etc.) — pas seulement
   que la page s'affiche sans erreur au chargement initial.
ENDOFFILE
echo "Fichier créé avec succès"