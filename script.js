
const messages = {
  calm: [
    "You don't have to figure everything out tonight.",
    "Slow down. You're allowed to take your time.",
    "Peace begins when you stop rushing yourself.",
    "Let this moment be enough."
  ],
  happy: [
    "Keep a little sunshine in your soul.",
    "Some moments deserve to be remembered forever.",
    "Your happiness looks good on your universe.",
    "Collect moments, not just memories."
  ],
  sad: [
    "Even the longest night eventually meets the dawn.",
    "You are allowed to feel things and still keep going.",
    "One difficult day doesn't define your whole story.",
    "Be gentle with yourself. You're doing your best."
  ],
  motivated: [
    "Your future self is cheering for you.",
    "Small steps still move you forward.",
    "You don't need to be perfect to begin.",
    "Dream it. Start it. Keep going."
  ]
};

const moodNames = {
  calm: "A NOTE FROM THE UNIVERSE",
  happy: "A LITTLE SUNSHINE FOR YOU",
  sad: "A GENTLE REMINDER",
  motivated: "YOUR DAILY SPARK"
};

let currentMood = "calm";

const message = document.getElementById("message");
const caption = document.getElementById("caption");
const secret = document.getElementById("secret");
const inspireBtn = document.getElementById("inspireBtn");
const surpriseBtn = document.getElementById("surpriseBtn");

function showMessage() {
  const options = messages[currentMood];
  const currentMessage = message.textContent;

  let nextMessage = currentMessage;

  while (options.length > 1 && nextMessage === currentMessage) {
    nextMessage = options[Math.floor(Math.random() * options.length)];
  }

  message.textContent = nextMessage;
  caption.textContent = moodNames[currentMood];
}

document.querySelectorAll(".mood").forEach((button) => {
  button.addEventListener("click", () => {
    currentMood = button.dataset.mood;

    document.querySelectorAll(".mood").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    showMessage();
    secret.hidden = true;
    surpriseBtn.textContent = "✦ Open your secret message";
  });
});

inspireBtn.addEventListener("click", showMessage);

surpriseBtn.addEventListener("click", () => {
  secret.hidden = !secret.hidden;

  surpriseBtn.textContent = secret.hidden
    ? "✦ Open your secret message"
    : "✦ Hide your secret message";

  if (!secret.hidden) {
    secret.textContent =
      "Somewhere in this enormous universe, there is still so much waiting for you. Keep going. ✨";
  }
});


const dreamInput = document.getElementById("dreamInput");
const saveDream = document.getElementById("saveDream");
const dreamList = document.getElementById("dreamList");
const journalStatus = document.getElementById("journalStatus");

const storageKey = "dreamscapeJournal";

let dreams = [];

try {
  const saved = localStorage.getItem(storageKey);
  dreams = saved ? JSON.parse(saved) : [];

  if (!Array.isArray(dreams)) dreams = [];
} catch {
  dreams = [];
}

function renderDreams() {
  dreamList.replaceChildren();

  dreams.forEach((dream) => {
    const card = document.createElement("article");
    card.className = "dream-card";

    const date = document.createElement("p");
    date.className = "dream-date";
    date.textContent = new Date(dream.date).toLocaleString();

    const text = document.createElement("p");
    text.className = "dream-text";
    text.textContent = dream.text;

    const remove = document.createElement("button");
    remove.className = "delete-dream";
    remove.textContent = "✕ Delete entry";

    remove.addEventListener("click", () => {
      dreams = dreams.filter((item) => item.id !== dream.id);

      try {
        localStorage.setItem(storageKey, JSON.stringify(dreams));
        renderDreams();
        journalStatus.textContent = "Entry deleted.";
      } catch {
        journalStatus.textContent = "Couldn't update storage.";
      }
    });

    card.append(date, text, remove);
    dreamList.append(card);
  });
}

saveDream.addEventListener("click", () => {
  const text = dreamInput.value.trim();

  if (!text) {
    journalStatus.textContent = "Write a little something first ✨";
    return;
  }

  const entry = {
    id: crypto.randomUUID(),
    text,
    date: new Date().toISOString()
  };

  dreams.unshift(entry);

  try {
    localStorage.setItem(storageKey, JSON.stringify(dreams));
    dreamInput.value = "";
    journalStatus.textContent = "Your thoughts have found a home ✨";
    renderDreams();
  } catch {
    dreams.shift();
    journalStatus.textContent =
      "Couldn't save. Your browser storage may be unavailable.";
  }
});

renderDreams();


/* COSMIC MUSIC PLAYER */

const cosmicAudio = document.getElementById("cosmicAudio");
const musicToggle = document.getElementById("musicToggle");
const musicVolume = document.getElementById("musicVolume");
const musicStatus = document.getElementById("musicStatus");
const visualizer = document.getElementById("visualizer");

cosmicAudio.volume = Number(musicVolume.value);

function updateMusicUI(isPlaying) {
  musicToggle.textContent = isPlaying ? "Ⅱ" : "▶";

  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Pause cosmic ambient music" : "Play cosmic ambient music"
  );

  visualizer.classList.toggle("playing", isPlaying);

  musicStatus.textContent = isPlaying
    ? "DRIFTING THROUGH THE COSMOS ✦"
    : "YOUR UNIVERSE IS WAITING";
}

musicToggle.addEventListener("click", async () => {
  if (!cosmicAudio.paused) {
    cosmicAudio.pause();
    return;
  }

  musicStatus.textContent = "CONNECTING TO THE COSMOS...";

  try {
    await cosmicAudio.play();
  } catch (error) {
    musicStatus.textContent =
      "COULDN'T PLAY — CHECK YOUR INTERNET CONNECTION";
    updateMusicUI(false);
  }
});

cosmicAudio.addEventListener("play", () => {
  updateMusicUI(true);
});

cosmicAudio.addEventListener("pause", () => {
  updateMusicUI(false);
});

cosmicAudio.addEventListener("error", () => {
  updateMusicUI(false);
  musicStatus.textContent =
    "AUDIO UNAVAILABLE — CHECK THE MUSIC SOURCE";
});

musicVolume.addEventListener("input", () => {
  cosmicAudio.volume = Number(musicVolume.value);
});

updateMusicUI(false);
