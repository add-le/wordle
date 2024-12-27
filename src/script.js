if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

let line = 0;
let w;

function groupArrayBySize(array, size) {
  const groupedArray = [];
  for (let i = 0; i < array.length; i += size) {
    groupedArray.push(array.slice(i, i + size));
  }
  return groupedArray;
}

function type(charcode) {
  let cells = document.querySelectorAll("body >div>div>div");

  for (const [i, c] of cells.entries()) {
    if (!c.innerText && i >= line * 5 && i <= line * 5 + 4) {
      c.innerText = charcode;
      break;
    }
  }
}

const kb = document.querySelector(".kb");

const letters = [
  "a",
  "z",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "q",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "w",
  "x",
  "c",
  "v",
  "b",
  "n",
];

for (const l of letters) {
  const letter = document.createElement("div");
  letter.innerText = l.toUpperCase();
  letter.className = "l";
  letter.onclick = () => type(l);
  letter.id = "letter-" + l;
  kb.appendChild(letter);
}

let bk = document.createElement("div");
bk.innerText = "⌫";
bk.className = "l";
bk.onclick = () => {
  let cells = document.querySelectorAll("body >div>div>div");

  const row = groupArrayBySize(Array.from(cells), 5);
  const cline = row[line];

  let r = cline.reverse();

  for (const c of r) {
    if (c.innerText) {
      c.innerText = "";
      break;
    }
  }
};
kb.appendChild(bk);

let val = document.createElement("div");
val.innerText = "⏎";
val.className = "l";
val.onclick = () => {
  let empty = "#3b3b3c";
  let good = "#528c4c";
  let ngood = "#b49e3a";

  let cells = document.querySelectorAll("body >div>div>div");

  const row = groupArrayBySize(Array.from(cells), 5);
  const cline = row[line];

  const cw = cline.map((s) => s.innerText).join("");

  if (cw.length !== 5 || w.length !== 5) {
    return;
  }

  if (!words.includes(cw.toLowerCase())) {
    alert("Mot inconnu.");
    return;
  }

  for (const [i, le] of cw.split("").entries()) {
    const divletter = document.getElementById("letter-" + le.toLowerCase());
    const ccur = divletter.style.backgroundColor;

    if (le.toUpperCase() === w[i].toUpperCase()) {
      cline[i].style.backgroundColor = good;
      divletter.style.backgroundColor = good;
    } else if (w.includes(le.toLowerCase())) {
      cline[i].style.backgroundColor = ngood;
      if (!ccur) divletter.style.backgroundColor = ngood;
    } else {
      cline[i].style.backgroundColor = empty;
      if (!ccur) divletter.style.backgroundColor = empty;
    }
  }

  if (cw.toLowerCase() === w.toLowerCase()) {
    alert("Gagné.");
    localStorage.setItem(
      new Date().toISOString(),
      JSON.stringify({ w, line, win: true })
    );
    window.location.reload();
  }

  if (line < 5) {
    line++;
  } else {
    alert("Perdu. Le mot était " + w.toLowerCase() + ".");
    localStorage.setItem(
      new Date().toISOString(),
      JSON.stringify({ w, line, win: false })
    );
    window.location.reload();
  }
};

kb.appendChild(val);

let len = words.length;
let i = Math.floor(Math.random() * len);
w = words[i];
