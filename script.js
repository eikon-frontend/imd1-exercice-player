const audioPlayer = (() => {
  let tracks = [];
  let currentTrackIndex = 0;
  let audio;
  const likes = JSON.parse(localStorage.getItem("likes")) || {};

  const elements = {
    playPause: document.querySelector("#play-pause"),
    prev: document.querySelector("#prev"),
    next: document.querySelector("#next"),
    progressBar: document.querySelector("#progress-bar"),
    trackTitle: document.querySelector("#track-title"),
    trackArtist: document.querySelector("#track-artist"),
    trackDuration: document.querySelector("#track-duration"),
    trackCurrentTime: document.querySelector("#track-current-time"),
    trackCover: document.querySelector("#cover"),
  };

  const optionalElements = {
    like: document.querySelector("#like"),
    volume: document.querySelector("#volume"),
    playlist: document.querySelector("#playlist"),
    playlistTrackTemplate: document.querySelector("#track-template"),
  };

  const displayError = (message) => {
    const errorElement = document.createElement("div");
    errorElement.textContent = message;
    errorElement.style.color = "red";
    document.body.prepend(errorElement);
  };

  Object.entries(elements).forEach(([key, element]) => {
    if (!element)
      displayError(`Élément "${key}" manquant. Veuillez consulter le README.`);
  });

  const updateTrackInfo = () => {
    const track = tracks[currentTrackIndex];
    if (elements.trackTitle) elements.trackTitle.textContent = track.title;
    if (elements.trackArtist) elements.trackArtist.textContent = track.artist;
    if (elements.trackDuration)
      elements.trackDuration.textContent = "0:00 / 0:00";
    if (elements.progressBar) elements.progressBar.value = 0;
    if (elements.trackCover) elements.trackCover.src = track.cover;
  };

  const loadTrack = (index) => {
    audio.src = tracks[index].src;
    audio.load();
    updateTrackInfo();
    updateLikeStatus();
    document
      .querySelectorAll(".track")
      .forEach((track) => track.classList.remove("current-track"));
    const playlistTrackItem = document.querySelector(`#track-${index}`);
    if (playlistTrackItem && index === currentTrackIndex)
      playlistTrackItem.classList.add("current-track");
  };

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const nextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
  };

  const prevTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
  };

  const updateProgressBar = () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    const progress = currentTime / duration || 0;
    if (elements.progressBar) {
      elements.progressBar.max = Math.floor(duration);
      elements.progressBar.value = Math.floor(currentTime);
    }
    if (elements.trackDuration)
      elements.trackDuration.textContent = formatTime(duration);
    if (elements.trackCurrentTime)
      elements.trackCurrentTime.textContent = formatTime(currentTime);
    document.documentElement.style.setProperty(
      "--progress-percentage",
      `${progress * 100}%`
    );
    document.documentElement.style.setProperty(
      "--progress-radius",
      `${progress * 360}deg`
    );
  };

  const seekAudio = () => {
    audio.currentTime = elements.progressBar.value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const toggleLike = () => {
    if (!optionalElements.like) return;
    optionalElements.like.classList.toggle("liked");
    const isLiked = optionalElements.like.classList.contains("liked");
    likes[tracks[currentTrackIndex].title + "_" + currentTrackIndex] = isLiked;
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  const updateLikeStatus = () => {
    if (!optionalElements.like) return;
    const isLiked =
      likes[tracks[currentTrackIndex].title + "_" + currentTrackIndex];
    if (isLiked) {
      optionalElements.like.classList.add("liked");
    } else {
      optionalElements.like.classList.remove("liked");
    }
  };

  const updateVolume = (e) => {
    const target = e.target || optionalElements.volume;
    audio.volume = target.value;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    let percentage = ((val - min) * 100) / (max - min);
    if (document.documentElement.dir === "rtl") percentage = max - val;
    localStorage.setItem("audioVolume", target.value);
    target.style.setProperty("--progress-percentage", percentage + "%");
  };

  const populatePlaylist = () => {
    if (!optionalElements.playlist || !optionalElements.playlistTrackTemplate)
      return;

    tracks.forEach((track, index) => {
      const clone = document.importNode(
        optionalElements.playlistTrackTemplate?.content,
        true
      );
      clone.querySelector(".track").setAttribute("id", `track-${index}`);
      clone.querySelector(".track-title").textContent = track.title;
      clone.querySelector(".track-artist").textContent = track.artist;
      clone.querySelector(".track").addEventListener("click", () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        audio.play();
      });
      optionalElements.playlist?.appendChild(clone);
    });
  };

  if (elements.playPause)
    elements.playPause.addEventListener("click", togglePlayPause);
  if (elements.next) elements.next.addEventListener("click", nextTrack);
  if (elements.prev) elements.prev.addEventListener("click", prevTrack);
  if (elements.progressBar)
    elements.progressBar.addEventListener("input", seekAudio);
  if (optionalElements.like)
    optionalElements.like.addEventListener("click", toggleLike);
  if (optionalElements.volume)
    optionalElements.volume.addEventListener("input", updateVolume);

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

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") togglePlayPause();
      if (e.code === "ArrowRight") nextTrack();
      if (e.code === "ArrowLeft") prevTrack();
    });

    const savedVolume = localStorage.getItem("audioVolume");
    if (savedVolume !== null && optionalElements.volume) {
      optionalElements.volume.value = savedVolume;
      updateVolume({ target: optionalElements.volume });
    }
    loadTrack(currentTrackIndex);
    if (optionalElements.volume) {
      optionalElements.volume.style.setProperty(
        "--progress-percentage",
        audio.volume * 100 + "%"
      );
    }
    populatePlaylist();
  };

  fetch("./tracks.json")
    .then((response) => response.json())
    .then((data) => {
      tracks = data;
      initializePlayer();
    })
    .catch(() =>
      displayError("Erreur lors du chargement des informations de la musique.")
    );
})();
