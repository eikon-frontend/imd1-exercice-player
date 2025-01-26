const audioPlayer = (() => {
  let tracks = [];
  let currentTrackIndex = 0;
  let audio;
  const likes = JSON.parse(localStorage.getItem("likes")) || {};

  // Helper to display error
  const displayError = (message) => {
    const errorElement = document.createElement("div");
    errorElement.textContent = message;
    errorElement.style.color = "red";
    document.body.prepend(errorElement);
  };

  // DOM Elements
  const playPauseBtn = document.querySelector("#play-pause");
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  const progressBar = document.querySelector("#progress-bar");
  const titleElement = document.querySelector("#track-title");
  const artistElement = document.querySelector("#track-artist");
  const durationElement = document.querySelector("#track-duration");
  const currentTimeElement = document.querySelector("#track-current-time");
  const likeBtn = document.querySelector("#like");
  const coverElement = document.querySelector("#cover");
  const volumeControl = document.querySelector("#volume");
  const playlistElement = document.querySelector("#playlist");
  const trackTemplate = document.querySelector("#track-template");

  const elements = {
    playPauseBtn,
    prevBtn,
    nextBtn,
    progressBar,
    titleElement,
    artistElement,
    durationElement,
    currentTimeElement,
    coverElement,
  };

  Object.entries(elements).forEach(([key, element]) => {
    if (!element) {
      displayError(`Élément "${key}" manquant. Veuillez consulter le README.`);
    }
  });

  // Helper to update track info
  const updateTrackInfo = () => {
    const track = tracks[currentTrackIndex];
    try {
      if (titleElement) titleElement.textContent = track.title;
      if (artistElement) artistElement.textContent = track.artist;
      if (durationElement) durationElement.textContent = "0:00 / 0:00";
      if (progressBar) progressBar.value = 0;
      if (coverElement) coverElement.src = track.cover;
    } catch (error) {
      displayError(
        "Erreur lors de la mise à jour des informations de la piste."
      );
    }
  };

  // Load a track
  const loadTrack = (index) => {
    try {
      audio.src = tracks[index].src;
      audio.load();
      updateTrackInfo();
      updateLikeStatus();

      document.querySelectorAll(".track").forEach((track) => {
        track.classList.remove("current-track");
      });

      const playlistTrackItem = document.querySelector(`#track-${index}`);
      if (playlistTrackItem && index === currentTrackIndex) {
        playlistTrackItem.classList.add("current-track");
      }
    } catch (error) {
      displayError("Erreur lors du chargement de la piste.");
    }
  };

  // Play / Pause functionality
  const togglePlayPause = () => {
    if (!playPauseBtn) {
      displayError("Bouton Play/Pause manquant. Veuillez consulter le README.");
      return;
    }
    try {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      displayError("Erreur lors de la lecture/pause de la piste.");
    }
  };

  // Move to next track
  const nextTrack = () => {
    try {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      loadTrack(currentTrackIndex);
      audio.play();
    } catch (error) {
      displayError("Erreur lors du passage à la piste suivante.");
    }
  };

  // Move to previous track
  const prevTrack = () => {
    try {
      currentTrackIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrackIndex);
      audio.play();
    } catch (error) {
      displayError("Erreur lors du retour à la piste précédente.");
    }
  };

  // Update progress bar
  const updateProgressBar = () => {
    try {
      const currentTime = audio.currentTime;
      const duration = audio.duration || 0;
      const progress = currentTime / duration || 0;
      if (progressBar) {
        progressBar.max = Math.floor(duration);
        progressBar.value = Math.floor(currentTime);
      }
      if (durationElement) durationElement.textContent = formatTime(duration);
      if (currentTimeElement)
        currentTimeElement.textContent = formatTime(currentTime);
      document.documentElement.style.setProperty(
        "--progress-percentage",
        `${progress * 100}%`
      );
      document.documentElement.style.setProperty(
        "--progress-radius",
        `${progress * 360}deg`
      );
    } catch (error) {
      displayError("Erreur lors de la mise à jour de la barre de progression.");
    }
  };

  // Seek functionality
  const seekAudio = () => {
    if (!progressBar) {
      displayError(
        "Barre de progression manquante. Veuillez consulter le README."
      );
      return;
    }
    try {
      audio.currentTime = progressBar.value;
    } catch (error) {
      displayError("Erreur lors de la recherche dans la piste.");
    }
  };

  // Format time helper
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Like button toggle
  const toggleLike = () => {
    if (!likeBtn) {
      displayError("Bouton Like manquant. Veuillez consulter le README.");
      return;
    }
    try {
      likeBtn.classList.toggle("liked");
      const isLiked = likeBtn.classList.contains("liked");
      likes[tracks[currentTrackIndex].title + "_" + currentTrackIndex] =
        isLiked;
      localStorage.setItem("likes", JSON.stringify(likes));
    } catch (error) {
      displayError("Erreur lors du changement de l'état du bouton Like.");
    }
  };

  // Update like status
  const updateLikeStatus = () => {
    if (!likeBtn) {
      displayError("Bouton Like manquant. Veuillez consulter le README.");
      return;
    }
    try {
      const isLiked =
        likes[tracks[currentTrackIndex].title + "_" + currentTrackIndex];
      if (isLiked) {
        likeBtn.classList.add("liked");
      } else {
        likeBtn.classList.remove("liked");
      }
    } catch (error) {
      displayError("Erreur lors de la mise à jour de l'état du bouton Like.");
    }
  };

  // Update volume
  const updateVolume = (e) => {
    if (!volumeControl) {
      displayError(
        "Contrôle du volume manquant. Veuillez consulter le README."
      );
      return;
    }
    try {
      const target = e.target || volumeControl;
      audio.volume = target.value;
      const min = target.min;
      const max = target.max;
      const val = target.value;
      let percentage = ((val - min) * 100) / (max - min);

      if (document.documentElement.dir === "rtl") {
        percentage = max - val;
      }
      localStorage.setItem("audioVolume", target.value);

      target.style.setProperty("--progress-percentage", percentage + "%");
    } catch (error) {
      displayError("Erreur lors de la mise à jour du volume.");
    }
  };

  // Populate playlist
  const populatePlaylist = () => {
    if (!playlistElement && !trackTemplate) {
      displayError(
        "Élément de la liste de lecture manquant. Veuillez consulter le README."
      );
      return;
    }
    try {
      tracks.forEach((track, index) => {
        const clone = document.importNode(trackTemplate.content, true);
        clone.querySelector(".track").setAttribute("id", `track-${index}`);
        clone.querySelector(".track-title").textContent = track.title;
        clone.querySelector(".track-artist").textContent = track.artist;

        clone.querySelector(".track").addEventListener("click", () => {
          currentTrackIndex = index;
          loadTrack(currentTrackIndex);
          audio.play();
        });
        playlistElement.appendChild(clone);
      });
    } catch (error) {
      displayError("Erreur lors de la population de la liste de lecture.");
    }
  };

  // Event listeners
  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause);
  if (nextBtn) nextBtn.addEventListener("click", nextTrack);
  if (prevBtn) prevBtn.addEventListener("click", prevTrack);
  if (progressBar) progressBar.addEventListener("input", seekAudio);
  if (likeBtn) likeBtn.addEventListener("click", toggleLike);
  if (volumeControl) volumeControl.addEventListener("input", updateVolume);

  // Initialize
  const initializePlayer = () => {
    audio = new Audio(tracks[currentTrackIndex].src);
    audio.addEventListener("timeupdate", updateProgressBar);
    audio.addEventListener("play", () =>
      document.body.classList.add("playing")
    );
    audio.addEventListener("pause", () =>
      document.body.classList.remove("playing")
    );
    audio.addEventListener("ended", nextTrack);

    try {
      const savedVolume = localStorage.getItem("audioVolume");
      if (savedVolume !== null && volumeControl) {
        volumeControl.value = savedVolume;
        updateVolume({ target: volumeControl });
      }
      loadTrack(currentTrackIndex);
      if (volumeControl) {
        volumeControl.style.setProperty(
          "--progress-percentage",
          audio.volume * 100 + "%"
        );
      }
      populatePlaylist();
    } catch (error) {
      displayError("Erreur lors de l'initialisation du lecteur audio.");
    }
  };

  fetch("./tracks.json")
    .then((response) => response.json())
    .then((data) => {
      tracks = data;
      initializePlayer();
    })
    .catch((error) => {
      displayError("Erreur lors du chargement des informations de la musique.");
    });
})();
