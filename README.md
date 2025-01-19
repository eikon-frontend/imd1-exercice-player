# Music Player

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

- [x] Couverture
  ```html
  <img id="cover" alt="cover" />
  ```
- [x] Titre
  ```html
  <h3 id="track-title">Titre</h3>
  ```
- [x] Artiste
  ```html
  <p id="track-artist">Artiste</p>
  ```
- [x] Durée temps écoulé
  ```html
  <span id="track-current-time">0:00</span>
  ```
- [x] Durée totale
  ```html
  <span id="track-duration">0:00</span>
  ```
- [x] Précédent
  ```html
  <button id="prev">Précédent</button>
  ```
- [x] Play/Pause
  ```html
  <button id="play-pause">
    <span id="play-icon">▶️</span>
    <span id="pause-icon">⏸️</span>
  </button>
  ```
- [x] Suivant
  ```html
  <button id="next">Suivant</button>
  ```
- [x] Like
  ```html
  <button id="like">❤️</button>
  ```
- [x] Barre de progression
  ```html
  <input type="range" id="progress-bar" value="0" min="0" step="1" />
  ```
- [x] Volume
  ```html
  <input type="range" id="volume" min="0" max="1" step="0.01" value="1" />
  ```
