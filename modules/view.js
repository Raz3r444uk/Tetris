import { SIZE_BLOCK, COLUMNS, ROWS } from "../main.js";

export class View {
  constructor(container) {
    this.container = container;
    this.preview();
  }

  colors = {
    J: "Yellow",
    I: "Green",
    O: "Blue",
    L: "Orange",
    T: "Indigo",
    S: "RoyalBlue",
    2: "Gold",
  };

  pushEl = document.createElement("div");
  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");

  preview() {
    this.pushEl.classList.add("push");
    document.body.append(this.pushEl);
    this.pushEl.innerHTML = "PUSH ENTER FOR START!";
  }

  init() {
    this.canvas.classList.add("game-area");
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  showArea(area) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== "o") {
          this.context.fillStyle = this.colors[block];
          this.context.strokeStyle = "red";
          this.context.fillRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
          this.context.strokeRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
        }
      }
    }
  }
}
