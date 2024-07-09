/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Fire Ddoges Water Sprig game
@author: Abigail Loken
@tags: []
@addedOn: 2024-00-00
*/

const obstacle = "o" // obstacle is water
const player = "p" // player is fire


setLegend(
  [ obstacle, bitmap`
................
................
.......77.......
......7777......
.....707707.....
....77700777....
....77777777....
....77377377....
....77377377....
...7777777777...
...7770000777...
...7707777077...
...7077777707...
...7777777777...
....77777777....
.....777777.....` ], // sprite of the water obstacle
  [player, bitmap`
................
................
................
......999.......
.....99999......
....9999999.....
...990999099....
...990999099....
...990999099....
...999999999....
..90999999909...
..99099999099...
..99909990999...
..99990009999...
...999999999....
....9999999.....`], // sprite of the fire player
)

const melody = tune `
500,
500: E4^500,
500: A4~500,
500,
500: E4^500 + D5-500,
500,
500: A4~500,
500: E4^500,
500: A4~500 + D5-500,
500,
500: F4^500,
500: A4~500,
500: E4^500,
500,
500: A4~500 + D5-500,
500,
500: D4^500,
500,
500: A4~500,
500: E4^500 + F5-500,
500: A4^500 + D5-500,
1500,
500: E4^500,
500: A4~500,
1000,
500: E4^500 + A4~500,
500: D5-500,
500,
500: B4-500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; // fire moves left
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; // fire moves right
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);