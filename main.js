const SIZE_BLOCK = 20;

const game = {
  area: [
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["x", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["x", "o", "o", "o", "s", "s", "o", "o", "x", "x"],
    ["x", "o", "o", "s", "s", "o", "o", "o", "x", "x"],
  ],

  activeFigure: {
    x: 3,
    y: 0,
    block: [
      ["o", "x", "o"],
      ["o", "x", "o"],
      ["x", "x", "o"],
    ],
    rotaterionIndex: 0,
    rotation: [
      [
        ["o", "x", "o"],
        ["o", "x", "o"],
        ["x", "x", "o"],
      ],
      [
        ["x", "o", "o"],
        ["x", "x", "x"],
        ["o", "o", "o"],
      ],
      [
        ["o", "x", "x"],
        ["o", "x", "o"],
        ["o", "x", "o"],
      ],
      [
        ["o", "o", "o"],
        ["x", "x", "x"],
        ["o", "o", "x"],
      ],
    ],
  },
  moveLeft() {
    if (this.checkOutPosition(this.activeFigure.x - 1, this.activeFigure.y)) {
      this.activeFigure.x -= 1;
    }
  },
  moveRight() {
    if (this.checkOutPosition(this.activeFigure.x + 1, this.activeFigure.y)) {
      this.activeFigure.x += 1;
    }
  },
  moveDown() {
    if (this.checkOutPosition(this.activeFigure.x, this.activeFigure.y + 1)) {
      this.activeFigure.y += 1;
    } else {
      this.stopMove();
    }
  },
  rotate() {
    this.activeFigure.rotaterionIndex =
      this.activeFigure.rotaterionIndex < 3
        ? this.activeFigure.rotaterionIndex + 1
        : 0;

    this.activeFigure.block =
      this.activeFigure.rotation[this.activeFigure.rotaterionIndex];
    if (!this.checkOutPosition(this.activeFigure.x, this.activeFigure.y)) {
      this.activeFigure.rotaterionIndex =
        this.activeFigure.rotaterionIndex > 0
          ? this.activeFigure.rotaterionIndex - 1
          : 3;

      this.activeFigure.block =
        this.activeFigure.rotation[this.activeFigure.rotaterionIndex];
    }
  },

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const { x, y, block: tetromino } = this.activeFigure;

    for (let i = 0; i < tetromino.length; i++) {
      const row = tetromino[i];

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          area[y + i][x + j] = tetromino[i][j];
        }
      }
    }
    return area;
  },

  checkOutPosition(x, y) {
    const tetromino = this.activeFigure.block;
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === "o") {
          continue;
        }

        if (
          !this.area[y + i] ||
          !this.area[y + i][x + j] ||
          this.area[y + i][x + j] !== "o"
        ) {
          return false;
        }
      }
    }
    return true;
  },
  stopMove() {
    const { x, y, block: tetromino } = this.activeFigure;
    for (let i = 0; i < tetromino.length; i++) {
      const row = tetromino[i];

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          this.area[y + i][x + j] = tetromino[i][j];
        }
      }
    }
  },
};

const container = document.querySelector(".container");
const pushEl = document.createElement("div");
document.body.append(pushEl);
pushEl.innerHTML = "PUSH ENTER";
pushEl.classList.add("push");

const canvas = document.createElement("canvas");
canvas.classList.add("game-area", "off");

container.append(canvas);

canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext("2d");

const showArea = (area) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < area.length; y++) {
    const line = area[y];
    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block !== "o") {
        context.fillStyle = "black";
        context.strokeStyle = "red";
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

window.addEventListener("keydown", (event) => {
  const key = event.code;
  switch (key) {
    case "Enter":
      canvas.classList.remove("off");
      pushEl.innerHTML = "";

    case "ArrowLeft":
      game.moveLeft();
      showArea(game.viewArea);
      break;
    case "ArrowRight":
      game.moveRight();
      showArea(game.viewArea);
      break;
    case "ArrowDown":
      game.moveDown();
      showArea(game.viewArea);
      break;
    case "ArrowUp":
      game.rotate();
      showArea(game.viewArea);
      break;
  }
});

showArea(game.viewArea);
