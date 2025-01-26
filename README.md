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
