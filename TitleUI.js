import { Game } from './main/Game.js';


window.onload=function init(){
  var button = [
    document.getElementById("GameStartBtn"),
    document.getElementById("GameSettingBtn"),
    document.getElementById("GameCreatorsBtn"),
    document.getElementById("GameMenuBtn"),
    document.getElementById("MenuResumeBtn"),
    document.getElementById("MenuRestartBtn"),
    document.getElementById("MenuSettingBtn"),
    document.getElementById("MenuQuitBtn"),
  ];
  var Menu =[
    document.getElementById("TitleMenu"),
    document.getElementById("GameMenu")
  ];
  var menuEnabled = false;
  button[0].addEventListener("click", () => {
    const game = new Game(); 
    window.game = game;
    Menu[0].style.display = "none";
    button[3].style.display = "block";
  });
  button[3].addEventListener("click", () => {
    if(!menuEnabled)
    {
      menuEnabled=true;
      Menu[1].style.display = "flex";
      button[3].style.display = "none";
    }
  });
  button[4].addEventListener("click", () => {
    if(menuEnabled)
    {
      menuEnabled=false;
      Menu[1].style.display = "none";
      button[3].style.display = "block";
    }
  });
}