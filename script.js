const elements = {
  inputSection: document.getElementById("inputSection"),
  comparisonSection: document.getElementById("comparisonSection"),
  resultSection: document.getElementById("resultSection"),

  itemInput: document.getElementById("itemInput"),

  startRankingBtn: document.getElementById("startRankingBtn"),
  startOverBtn: document.getElementById("startOverBtn"),
  newRankingBtn: document.getElementById("newRankingBtn"),
};

function init() {
  elements.startRankingBtn.addEventListener("click", startRanking);
}

function startRanking() {
  const itemsText = elements.itemInput.value.trim();

  const items = itemsText
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  if (items.length < 2) {
    alert("Please enter at least two items to rank.");
    return;
  }

  elements.inputSection.style.display = "none";
  elements.comparisonSection.style.display = "block";
}

init();
