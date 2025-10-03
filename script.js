// DOM Elements
const inputSection = document.getElementById("inputSection");
const comparisonSection = document.getElementById("comparisonSection");
const resultSection = document.getElementById("resultSection");

const itemInput = document.getElementById("itemInput");

const startRankingBtn = document.getElementById("startRankingBtn");
const startOverBtn = document.getElementById("startOverBtn");
const newRankingBtn = document.getElementsByClassName("newRankingBtn");

const comparisonContainer = document.getElementById("comparisonContainer");
const resultContainer = document.getElementById("resultContainer");

function init() {
  startRankingBtn.addEventListener("click", startRanking);
}

async function startRanking() {
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
  resultSection.style.display = "none";

  const rankedItems = await mergeSort(items);

  console.log("Final Ranked Items:", rankedItems);
}

async function mergeSort(items) {
  if (items.length <= 1) {
    return items;
  }

  const mid = Math.floor(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const sortedLeft = await mergeSort(left);
  const sortedRight = await mergeSort(right);

  return await merge(sortedLeft, sortedRight);
}

async function merge(left, right) {
  const sortedItems = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const winner = await getUserChoice(left[leftIndex], right[rightIndex]);
    if (winner === left[leftIndex]) {
      sortedItems.push(left[leftIndex]);
      leftIndex++;
    } else {
      sortedItems.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return sortedItems
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

function getUserChoice(item1, item2) {
  return new Promise((resolve) => {
    comparisonContainer.innerHTML = "";

    const btn1 = document.createElement("button");
    btn1.textContent = item1;
    btn1.className = "choice-btn";
    btn1.onclick = () => resolve(item1);
    
    const btn2 = document.createElement("button");
    btn2.textContent = item2;
    btn2.className = "choice-btn";
    btn2.onclick = () => resolve(item2);
    
    comparisonContainer.appendChild(btn1);
    comparisonContainer.appendChild(btn2);
  });
}

init();