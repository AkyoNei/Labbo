const journeyData = [
  {
    date: "2025-12-22",
    text: "Tried learning React hooks and state management. Still confusing, but fun!",
    image: "./assets/journey-react.png",
    category: "coding",
    badge: "Level Up"
  },
  {
    date: "2025-12-20",
    text: "Built my first popup skill card for portfolio. Feels like leveling up!",
    image: "./assets/journey-portfolio.png",
    category: "design",
    badge: "New"
  },
  {
    date: "2025-12-18",
    text: "Started Unity C# scripting. Player movement finally works!",
    image: "./assets/journey-unity.png",
    category: "game",
    badge: "Boss Defeated"
  }
];

const grid = document.getElementById("journeyGrid");
const modal = document.getElementById("journeyModal");
const modalDate = document.getElementById("modalDate");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");
const beep = document.getElementById("beepSound");

function renderJourney(filter = "all") {
  grid.innerHTML = "";

  journeyData
    .filter(e => filter === "all" || e.category === filter)
    .forEach(entry => {
      const card = document.createElement("div");
      card.className = "journey__card";

      card.innerHTML = `
        <span class="badge">${entry.badge}</span>
        <img src="${entry.image}" alt="">
        <div class="journey__date">${entry.date}</div>
        <div class="journey__text">${entry.text.slice(0, 60)}...</div>
        <span class="journey__btn">READ LOG</span>
      `;

      card.addEventListener("click", () => {
        beep.currentTime = 0;
        beep.play();
        openModal(entry);
      });

      grid.appendChild(card);
    });
}

function openModal(entry) {
  modal.classList.add("show");
  modalDate.textContent = entry.date;
  typeText(entry.text);
}

// TYPING EFFECT
function typeText(text) {
  modalText.textContent = "";
  let i = 0;
  const speed = 30;

  const typing = setInterval(() => {
    if (i < text.length) {
      modalText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
}

// CLOSE MODAL
modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// FILTER HANDLER
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderJourney(btn.dataset.filter);
  });
});

// INIT
renderJourney();
