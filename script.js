// DOM Elements
const inputSection = document.getElementById("inputSection");
const comparisonSection = document.getElementById("comparisonSection");
const resultSection = document.getElementById("resultSection");

const itemInput = document.getElementById("itemInput");

const startRankingBtn = document.getElementById("startRankingBtn");
const startOverBtn = document.getElementById("startOverBtn");
const newRankingBtn = document.getElementById("newRankingBtn");

const comparisonContainer = document.getElementById("comparisonContainer");
const resultContainer = document.getElementById("resultContainer");

// Global Variables
let itemsObjects = [];

function init() {
  startRankingBtn.addEventListener("click", startRanking);
}

function startRanking() {
  const itemsText = itemInput.value.trim();

  const items = itemsText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  if (items.length < 2) {
    alert("Please enter at least two items to rank.");
    return;
  }

  inputSection.style.display = "none";
  comparisonSection.style.display = "block";

  itemsObjects = items.map((name) => ({ name: name, score: 0 }));

  nextComparisioins();
}

function nextComparisioins() {
  comparisonContainer.innerHTML = "";

  const tiedItems = findNextComparisons();

  if (tiedItems) {
    tiedItems.forEach((item) => {
      const itemBtn = document.createElement("button");
      itemBtn.className = "item-btn";
      itemBtn.textContent = item.name;

      itemBtn.addEventListener("click", handleChoice);

      comparisonContainer.appendChild(itemBtn);
    });
  } else {
    console.log("Ranking complete");
  }
}
function handleChoice(event) {
  const chosenItemName = event.target.textContent;
  const chosenItem = itemsObjects.find((item) => item.name === chosenItemName);
  if (chosenItem) {
    chosenItem.score += 1;
  }
  nextComparisioins();
}

function findNextComparisons() {
  for (let i = 0; i < itemsObjects.length; i++) {
    for (let j = i + 1; j < itemsObjects.length; j++) {
      if (itemsObjects[i].score === itemsObjects[j].score) {
        const score = itemsObjects[i].score;
        return (tiedItems = itemsObjects.filter(
          (item) => item.score === score
        ));
      }
    }
  }
  return null;
}
init();
