import { SIZE_BLOCK, COLUMNS, ROWS } from "../main.js";

export class View {
  constructor(container) {
    this.container = container;
    this.preview();
  }

  colors = {
    J: "DarkRed",
    I: "FireBrick",
    O: "Red",
    L: "Crimson",
    T: "IndianRed",
    S: "Salmon",
    2: "DarkSalmon",
  };

  canvas = document.createElement("canvas");

  preview() {
    this.container.textContent = "";
    const preview = document.createElement("div");
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");
    const bottomArrow = document.createElement("div");
    const topArrow = document.createElement("div");

    preview.innerHTML = "Push 'SPACE' to start";
    leftArrow.innerHTML = "LEFT";
    rightArrow.innerHTML = "RIGHT";
    bottomArrow.innerHTML = "ACCELERATION";
    topArrow.innerHTML = "ROTATE";

    this.container.append(
      preview,
      leftArrow,
      rightArrow,
      bottomArrow,
      topArrow
    );

    leftArrow.classList.add("arrow", "left");
    rightArrow.classList.add("arrow", "right");
    bottomArrow.classList.add("arrow", "bottom");
    topArrow.classList.add("arrow", "top");

    preview.style.cssText = `
    border: 3px solid red ;
    background-color: black;
    cursor: pointer;
    text-align: center;
    padding:50px;
    font-size: 40px;
    color: red;
    margin: 0;
    margin-bottom: 20px;
    grid-column: 1 / 3;
    font-weight: 900
    `;
  }

  init() {
    this.container.textContent = "";
    this.canvas.classList.add("game-area");
    this.canvas.style.gridArea = "game";
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement("div");
    scoreBlock.style.cssText = `
    border: 4px solid red;
    text-align: center;
    font-size: 20px;
    padding: 20px;
    color: red;
    grid-area:score;
    font-weight: 600;
    background-image: url(../img/2.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    `;

    const linesElem = document.createElement("p");
    const scoreElem = document.createElement("p");
    const levelElem = document.createElement("p");
    const recordElem = document.createElement("p");

    scoreBlock.append(recordElem, levelElem, linesElem, scoreElem);
    this.container.append(scoreBlock);

    return (lines, score, level, record) => {
      linesElem.textContent = `LINES: ${lines}`;
      scoreElem.textContent = `SCORE: ${score}`;
      levelElem.textContent = `LEVEL: ${level}`;
      recordElem.textContent = `RECORD: ${record}`;
    };
  }

  createBlockNextTetromino() {
    const tetrominoBlock = document.createElement("div");
    tetrominoBlock.style.cssText = `
    width: ${SIZE_BLOCK * 4}px;
    height: ${SIZE_BLOCK * 4}px;
    border: 4px solid red;
    background-image: url(../img/3.png);
    background-position: center;
    background-size: cover;
    padding: 20px;
    grid-area: next;
    display-flex;
    align-items: center;
    align-self: center;
    justify-content: flex-end; 
    `;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    tetrominoBlock.append(canvas);
    this.container.append(tetrominoBlock);

    return (tetromino) => {
      canvas.width = SIZE_BLOCK * tetromino.length;
      canvas.height = SIZE_BLOCK * tetromino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetromino.length; y++) {
        const line = tetromino[y];
        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== "o") {
            context.fillStyle = this.colors[block];
            context.strokeStyle = "White";
            context.fillRect(
              x * SIZE_BLOCK,
              y * SIZE_BLOCK,
              SIZE_BLOCK,
              SIZE_BLOCK
            );
            context.strokeRect(
              x * SIZE_BLOCK,
              y * SIZE_BLOCK,
              SIZE_BLOCK,
              SIZE_BLOCK
            );
          }
        }
      }
    };
  }

  showArea(area) {
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== "o") {
          context.fillStyle = this.colors[block];
          context.strokeStyle = "white";
          context.fillRect(
            x * SIZE_BLOCK,
            y * SIZE_BLOCK,
            SIZE_BLOCK,
            SIZE_BLOCK
          );
          context.strokeRect(
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
