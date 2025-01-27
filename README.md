# Music Player

## Objectif personnel

Définissez un objectif personnel pour ce projet. Cela peut être un objectif technique ou un objectif de conception. Par exemple, vous pouvez décider de vous concentrer sur la mise en page, la typographie, les couleurs, les animations, les transitions, les effets visuels, la propreté du code, la sémantique, la performance, ou tout autre aspect qui vous intéresse.

**Mon Objectif Personnel**

> [ÉCRIVEZ VOTRE OBJECTIF ICI]

## Consignes

Adaptez le code HTML et CSS (sans toucher au JS) pour mettre en page et en forme votre player de musique selon le design réalisé sur Figma. Vous devrez :

Vous avez à disposition un fichier `index.html` avec le code HTML de base, un fichier `style.css` pour les styles, et un fichier `script.js` qui contient le code JavaScript pour le player de musique.

1. Modifier le fichier HTML pour inclure tous les éléments nécessaires au bon fonctionnement du player. La base du player est déjà en place, vous devez ajouter les éléments manquants afin d'intégrer fidèlement votre design Figma.
2. Utiliser les classes et les identifiants fournis pour styliser les éléments du player. Certaines classes et identifiants sont déjà présents dans le fichier HTML et le fichier CSS, vous pouvez les modifier ou en ajouter de nouveaux si nécessaire. Quelques classes sont injectées dynamiquement par le script JavaScript, vous pouvez les utiliser pour cibler les éléments du player selon les différents états de celui-ci.
3. S'assurer que le player fonctionne correctement sur différentes tailles d'écrans mobiles.
4. Tester le player pour vérifier que tous les éléments sont bien alignés et que les interactions (comme les boutons play/pause, précédent/suivant, et la barre de progression) fonctionnent comme prévu.

L'objectif est de créer un player de musique fonctionnel et esthétiquement conforme au design que vous avez réalisé sur Figma en cours de UI Design.

## Installation

Vous pouvez ajouter autant de fichiers audio que vous le souhaitez. Pour cela, modifiez le fichier `tracks.json` pour ajouter les informations de vos musiques sous ce format:

```json
[
  {
    "title": "Outer Wilds",
    "artist": "Andrew Prahlow",
    "src": "music/OuterWilds.mp3",
    "cover": "covers/OuterWilds.jpg"
  },
  {
    "title": "Gucci Gang",
    "artist": "Lil Pump",
    "src": "music/GucciGang.mp3",
    "cover": "covers/GucciGang.png"
  }
]
```

## Éléments

Tous ces éléments doivent être présents dans le fichier HTML pour assurer le bon fonctionnement du player de musique.

- **Couverture – `trackCover`**
  ```html
  <img id="cover" alt="cover" />
  ```
- **Titre – `trackTitle`**
  ```html
  <h3 id="track-title">Titre</h3>
  ```
- **Artiste – `trackArtist`**
  ```html
  <p id="track-artist">Artiste</p>
  ```
- **Durée temps écoulé – `trackCurrentTime`**
  ```html
  <span id="track-current-time">0:00</span>
  ```
- **Durée totale – `trackDuration`**
  ```html
  <span id="track-duration">0:00</span>
  ```
- **Précédent – `prev`**
  ```html
  <button id="prev">Précédent</button>
  ```
- **Play/Pause – `playPause`**
  ```html
  <button id="play-pause">
    <span id="play-icon">▶️</span>
    <span id="pause-icon">⏸️</span>
  </button>
  ```
- **Suivant – `next`**
  ```html
  <button id="next">Suivant</button>
  ```
- **Barre de progression – `progressBar`**
  ```html
  <input type="range" id="progress-bar" value="0" min="0" step="1" />
  ```
- **Like (optionnel) – `like`**
  ```html
  <button id="like">❤️</button>
  ```
- **Volume (optionnel) – `volume`**
  ```html
  <input type="range" id="volume" min="0" max="1" step="0.01" value="1" />
  ```
- **Playlist (optionnel) – `playlist` `playlistTrackTemplate`**

  L'élément avec la classe `track` sera automatiquement cloné pour chaque musique ajoutée dans le fichier `tracks.json`. Pour que cela fonctionne correctement, il doit être placé dans un élélment `template` avec l'id `track-template`:

  ```html
  <ul id="playlist">
    <template id="track-template">
      <li class="track">
        <h4 class="track-title">Titre</h4>
        <p class="track-artist">Artiste</p>
      </li>
    </template>
  </ul>
  ```
