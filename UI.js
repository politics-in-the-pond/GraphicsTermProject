import { Game } from './main/Game.js';


window.onload=function init(){
  document.getElementById("GameStartBtn").addEventListener("click", () => {
    const game = new Game(); 
    window.game = game;
  });
}